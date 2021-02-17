import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

export default function App() {
  return (
    <> 
    <Header />
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    <Footer />
    </>
   
  );
}


export function Header() {
  return (
    <View style={styles.header}>
    <Text style={[styles.font]}>Home</Text>
      <StatusBar style="auto" />
    </View>
  );
}




export function Footer() {
  return (
    <View style={styles.footer}>
    <View style={styles.home}>
       <Ionicons name="home" size = {24}color="#999999" />
       <Text style = {[styles.footerFont]}> Home</Text>
    </View>
       <View style={styles.explore}>
       <FontAwesome name="map" size = {22}color="#999999" />
       <Text style = {[styles.footerFont]}> Explore</Text>
    </View>
    <View style={styles.saved}>
    <MaterialIcons name="collections-bookmark" size={24} color="#999999" />
       <Text style = {[styles.footerFont]}> Saved</Text>
    </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    backgroundColor: '#007aff',
    height:100,
    alignItems: 'center',
  
  },
  font:{
    color:'white',
    fontWeight: 'bold',
    paddingTop:60,
    fontSize:25,
  },
  footer:{
    backgroundColor: '#F4F4F4',
    height:90,
    alignItems: 'center',
    borderTopColor:'#DBDBDB',
    borderTopWidth:0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  home:{
    flex:1,
    alignItems: 'center',
    paddingBottom:30,
    justifyContent: 'center',
  },
  explore:{
    flex:1,
    alignItems: 'center',
    paddingBottom:24,
    justifyContent: 'center',
  },
  saved:{
    flex:1,
    alignItems: 'center',
    paddingBottom:30,
    justifyContent: 'center',
  },
  footerFont:{
    fontSize:10,
  },
});
