import React from 'react';
import {StyleSheet, Text, View,SafeAreaView,StatusBar,Dimensions, TouchableOpacity} from 'react-native';
import axios from 'axios';
const h=Dimensions.get('window').height;
const w=Dimensions.get('window').width;

export default function Dash({setauthenticated}){
    return(
        <SafeAreaView style={styles.main}>
        <View style={styles.head}>
          <Text style={styles.title}>College Bus Tracker</Text>
          <TouchableOpacity onPress={() => {setauthenticated(false); console.log('signed out')}} style={styles.signOutButton}>
                <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
         <View style={styles.etabox}>
           <View style={styles.etaitembox}>
             <View style={{width:'55%',alignItems:"flex-end" }}>
               <Text style={{fontFamily:"Nexa-Heavy",color:"black",padding:5, fontSize:17}}>
                 ETA to College
               </Text>
             </View>
             <View style={{width:'45%',alignItems: 'center' }}>
               <Text style={styles.statusTag}>Yes</Text>
             </View>
           </View>
           <View style={styles.circlebox}>
             <View style={styles.circle}>
 
             </View>
           </View>
         </View>
  
     </SafeAreaView>
    );
}
const styles=StyleSheet.create({
    main:{
      backgroundColor: "#ffffff",
      flexDirection:'column',
      flex:1
    },
    head: {
        flex: 0.07,
        backgroundColor: "black",
        flexDirection: 'row', // Change to row to align button and title horizontally
        alignItems: "center",
        justifyContent: 'flex-end', // To space button and title apart
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 5,
        borderBottomColor: "#565353",
        borderBottomEndRadius: 5,
        paddingHorizontal: 5, // Add padding to space the button and title from the edges
      },
      title: {
        fontFamily: "Nexa-Heavy",
        fontSize: 22,
        color: "white",
        paddingRight:10
      },
      signOutButton: {
        backgroundColor: "red", // Change to your desired color
        borderRadius: 5,
        padding: 8,
        marginLeft: 10, // Add margin to separate it from the title
      },
      signOutButtonText: {
        color: "white",
        fontSize: 16,
      },      
    etabox:{
      flex:0.27,
      backgroundColor:"white",
      padding:10,
      alignItems:"center",
      
    },
   etaitembox:{
      padding:5,
      height:'20%',
      width:'100%',
      flexDirection:'row',
   },
   statusTag: {
      fontSize: 16,
      backgroundColor: 'green', // Example color
      color: 'white',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 8,
    },
    circlebox:{
      width:'100%',
      height:'80%',
      alignItems:"center",
      justifyContent:"center",
      display:"flex",
     
    },
   circle:{
    width: w * 0.4, // Set the width based on the screen width
    aspectRatio: 1, // Maintain aspect ratio
    borderRadius: w * 0.25, // Set the border radius based on the screen width
    backgroundColor: 'black',
    },
  })