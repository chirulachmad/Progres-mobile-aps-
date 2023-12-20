import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import TabNavigation from "./Navigations/TabNavigation";
// import MapView from "react-native-maps";

export default function App() {
  // const onRegionChange = (Region) => {
  //   console.log(Region);
  // };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  // maps: {
  //   width: "100%",
  //   height: "100%",
  // },
});
