import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";

export default function Search() {
  const [location, setlocation] = useState(null);
  const [address, setAddress] = useState("");
  const [locationOfInterest, setLocationOfInterest] = useState([]);
  const [geocodingInfo, setGeocodingInfo] = useState(null);
  const [dataCurrentLocation, setDataCurrentLocation] = useState([]);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setlocation(currentLocation);
      console.log("Location : ");
      console.log(currentLocation);
    };
    getPermissions();
  }, []);

  useEffect(() => {
    if (location) {
      reversegeocode();
    }
  }, [location]);

  // Fungsi untuk membersihkan kata-kata tertentu dari query
  const cleanQuery = (query) => {
    const excludedKeywords = [
      "Kecamatan",
      "Kota",
      "Kabupaten",
      "Kelurahan",
      "Provinsi",
      " ",
    ];
    // Mengecualikan kata-kata yang tidak diinginkan dari query
    const cleanedQuery = query
      .split(" ")
      .filter((word) => !excludedKeywords.includes(word))
      .join("%20");
    return cleanedQuery;
  };

  const geocode = async () => {
    if (!location) {
      console.log("Location not available yet");
      return;
    }

    try {
      const results = [];

      // Iterate through each element in dataCurrentLocation and perform separate queries
      for (const query of dataCurrentLocation) {
        // Membersihkan query dari kata-kata yang tidak diinginkan
        const cleanedQuery = cleanQuery(query);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=lapangan%20${cleanedQuery}&limit=15&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
        );

        if (!response.ok) {
          console.log(`Error fetching data for query: ${cleanedQuery}`);
          continue; // Skip to the next iteration in case of an error
        }

        const data = await response.json();
        console.log(`Results for query ${cleanedQuery}:`, data);

        // Extracting relevant data and adding it to the results array
        const newData = data.map((item) => ({
          display_name: item.display_name,
          latitude: item.lat,
          longitude: item.lon,
        }));
        results.push(...newData);
      }

      // Updating locationOfInterest state with the combined results
      setLocationOfInterest(results);
      console.log("Updated locationOfInterest:");
      console.log(locationOfInterest);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const reversegeocode = async () => {
    const reversegeocodeaddress = await Location.reverseGeocodeAsync({
      longitude: location?.coords?.longitude || 0,
      latitude: location?.coords?.latitude || 0,
    });
    setGeocodingInfo(reversegeocodeaddress[0]);
    console.log("Reverse Geocoded:");
    console.log(reversegeocodeaddress);

    if (reversegeocodeaddress[0]) {
      console.log("City:", reversegeocodeaddress[0].city);
      console.log("District:", reversegeocodeaddress[0].district);
      console.log("Subregion:", reversegeocodeaddress[0].subregion);
      const newData = [
        reversegeocodeaddress[0].city,
        reversegeocodeaddress[0].district,
        reversegeocodeaddress[0].subregion,
      ];
      setDataCurrentLocation(newData);
    } else {
      console.log("Geocoding info not available");
    }
  };

  let ShowLocationsOfInterest = () => {
    return locationOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={{
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
          }}
          title={item.display_name}
          description={`Lat: ${item.latitude}, Lon: ${item.longitude}`}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder=" Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Geocode Address" onPress={geocode} />

      {location && (
        <MapView
          style={styles.maps}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005251309080501976,
            longitudeDelta: 0.002587325870990753,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            description="Your current location"
            pinColor="cyan"
          />
          {ShowLocationsOfInterest()}
        </MapView>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  maps: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
});
