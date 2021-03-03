import { StyleSheet, Text, View, Image } from "react-native";
import Header from "../components/Header";
import { SearchBar } from 'react-native-elements';
import Footer from "../components/Footer";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "../components/Button";


export default function SavedScreen({navigation}) {

  const [count, setCount] = useState(0);


  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        platform="ios"
      />
      <View>
        <Text style={styles.h1}>Your Lists</Text>
      </View>
      <View style={{marginTop: 10}}>
              <Button text="Sign out" onPress={()=>{
              try {
                 AsyncStorage.removeItem(
                  '@user_key'
                );
                navigation.navigate('Home');
              } catch (error) {
                // Error saving data
              }

              }}/>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  h1: {
    color: "#389BF2",
    fontSize: 22,
    marginTop: 22,
    marginLeft: 36,
  },
});
