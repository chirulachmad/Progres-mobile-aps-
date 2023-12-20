import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

export default function Search() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [locationOfInterest, setLocationOfInterest] = useState([]);
  const [geocodingInfo, setGeocodingInfo] = useState(null);
  const [dataCurrentLocation, setDataCurrentLocation] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Please grant location permissions");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log("Location: ");
        console.log(currentLocation);
      } catch (error) {
        console.error("Error getting location permissions:", error);
      }
    };

    getPermissions();
  }, []);

  useEffect(() => {
    const geocode = async () => {
      if (!location) {
        console.log("Location not available yet");
        return;
      }

      try {
        const results = [];

        for (const query of dataCurrentLocation) {
          const cleanedQuery = cleanQuery(query);

          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=lapangan%20${cleanedQuery}&limit=15&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
          );

          if (!response.ok) {
            console.log(`Error fetching data for query: ${cleanedQuery}`);
            continue;
          }

          const data = await response.json();
          console.log(`Results for query lapangan ${cleanedQuery}:`, data);

          const newData = data.map((item) => ({
            display_name: item.display_name,
            latitude: item.lat,
            longitude: item.lon,
          }));
          results.push(...newData);
        }

        setLocationOfInterest(results);
        console.log("Updated locationOfInterest:");
        console.log(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    geocode();
  }, [location, dataCurrentLocation]);

  const cleanQuery = (query) => {
    const excludedKeywords = [
      "Kecamatan",
      "Kota",
      "Kabupaten",
      "Kelurahan",
      "Provinsi",
      " ",
    ];
    const cleanedQuery = query
      .split(" ")
      .filter((word) => !excludedKeywords.includes(word))
      .join("%20");
    return cleanedQuery;
  };

  const reversegeocode = async () => {
    try {
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
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
    }
  };

  useEffect(() => {
    if (location) {
      reversegeocode();
    }
  }, [location]);

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
          onPress={() => setSelectedMarker(item)}
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
          {selectedMarker && (
            <MapViewDirections
              origin={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              destination={{
                latitude: parseFloat(selectedMarker.latitude),
                longitude: parseFloat(selectedMarker.longitude),
              }}
              apikey={"AIzaSyADDy0erohaeIF0quAusr0zlQwt5fPXPjI"} // Pass null for free access to OSRM
              strokeWidth={3}
              strokeColor="hotpink"
            />
          )}
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
