import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { StatusBar } from "expo-status-bar";

class Homepage extends Component {
  navigateToListArticle = () => {
    this.props.navigation.navigate("Article");
  };

  render() {
    const fullName = "Achmad chairul irfansyah";
    const nim = "1203210006";
    const address = "Canggu-jetis, Mojokerto";
    const kampus = "Telkom University";

    return (
      <View style={{ flex: 1, backgroundColor: "grey" }}>
        <StatusBar style="center" />
        <View style={{ flex: 7, backgroundColor: "#ffffff" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1.0 }}>
              <Image
                source={require("../assets/avatar.png")}
                style={{
                  marginTop: 50,
                  width: 200,
                  height: 200,
                  borderRadius: 1000 / 2,
                  borderWidth: 3,
                  borderColor: "#ffffff",
                  position: "relative",
                  zIndex: 400,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  zIndex: 500,
                  width: 25,
                  height: 25,
                  backgroundColor: "#ffffff",
                  borderRadius: 50 / 2,
                }}
              >
                <Icon name="plus" size={20} color="#000000" />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 275 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                textAlign: "center",
                color: "black",
              }}
            >
              {fullName}
            </Text>
            <Text style={{ textAlign: "center", color: "black" }}>{nim}</Text>
            <View style={{ marginLeft: 125 }}>
              <View style={styles.Listsosmed}>
                <View style={styles.iconstyles}>
                  <Icon name="whatsapp" size={25} color="#212121" />
                </View>
                <View style={styles.content}>
                  <Text style={styles.keterangan}>+62-8785-5724-322</Text>
                </View>
              </View>
              <View style={styles.Listsosmed}>
                <View style={styles.iconstyles}>
                  <Icon name="map-marker-alt" size={25} color="#212121" />
                </View>
                <View style={styles.content}>
                  <Text style={styles.keterangan}>{address}</Text>
                </View>
              </View>
              <View style={styles.Listsosmed}>
                <View style={styles.iconstyles}>
                  <Icon name="university" size={25} color="#212121" />
                </View>
                <View style={styles.content}>
                  <Text style={styles.keterangan}>{kampus}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Homepage;

const styles = {
  button: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    marginTop: 10,
  },
  nama: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  desc: {
    textAlign: "center",
  },
  Listsosmed: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  keterangan: {
    fontWeight: "bold",
  },
  content: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 10,
  },
  iconstyles: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  betweenicons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
