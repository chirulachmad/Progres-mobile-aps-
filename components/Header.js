import { View, Text, Image, StyleSheet, TextInput, Dimensions } from "react-native";
import React from "react";

export default function Header() {
  return (
    <View style= {{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
      <Image source={require("./../assets/gps.png")} 
        style= {styles.logo}
      />
      <View style= {styles.searchBar}>
        <TextInput placeholder="search here"/>
      </View>
      <Image source={require("./../assets/search.png")} 
        style= {styles.logoUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    logo: {
        width: 40,
        height: 40,
    },
    searchBar: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 4,
        borderRadius: 50,
        paddingLeft: 10,
        width:Dimensions.get('screen').width*0.6
    },
    logoUser:{
        width: 35,
        height: 35,
    }
})