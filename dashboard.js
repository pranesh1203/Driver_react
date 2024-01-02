import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, View,SafeAreaView,StatusBar,Dimensions, TouchableOpacity,PermissionsAndroid} from 'react-native';
import loc_update from './loc-fire';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
const h=Dimensions.get('window').height;
const w=Dimensions.get('window').width;

export default function Dash({setauthenticated}){
  const [start,setstart]=useState(false)
  const [eta,seteta]=useState();
  loc_update();
  useEffect(()=>
  {
    if(!start){seteta('--')}
    else{
      
      const reff = database();
  const drv = reff.ref('Route');
  const samp = drv.child('2a');
  samp.on('value', snapshot => {
    const js=snapshot.val();
   seteta(Math.ceil(js[16].eta/60))
    console.log(eta)
  });
    }
  },
  [start])
  

  console.log(2)
    return(
        <SafeAreaView style={styles.main}>
        <View style={styles.head}>
          <Text style={styles.title}>College Bus Tracker</Text>
          <TouchableOpacity onPress={() => {auth().signOut().then(() => console.log('User signed out!'));setauthenticated(false)}} style={styles.signOutButton}>
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
               <Text style={styles.statusTag}>On Time</Text>
             </View>
           </View>
           <View style={styles.circlebox}>
             <View style={styles.circle}>
                <View style={styles.sqeta}>
                  <Text style={styles.sqetatxt}>{eta}</Text>
                  <Text style={{color:"white",fontSize:16}}>Minutes</Text>
                </View>
             </View>
           </View>
         </View>
         <View style={{flex:0.62,justifyContent:'flex-end',alignItems:"center",}}>
          <TouchableOpacity style={styles.stsp} onPress={()=>start?setstart(false):setstart(true)}>
            <Text style={{color: "white",
        fontSize: 16,}}>{start?'Stop':'Start'}</Text>
          </TouchableOpacity>
         </View>
     </SafeAreaView>
    );
}
const styles=StyleSheet.create({
    main:{
      backgroundColor: "#ffffff",
      flexDirection:'column',
      flex:1,
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
    alignItems:"center",
    justifyContent:"center",
    },
    sqeta:{
      width:'70%',
      height:'70%',
      backgroundColor:"black",
      alignItems:"center",
    justifyContent:"center",
    display:"flex",
    },
    sqetatxt: {
      fontFamily: "Nexa-Heavy",
      fontSize: 60,
      color: "white",
      padding:10,
    },
    stsp:{
      backgroundColor: "black", // Change to your desired color
      borderRadius: 5,
      padding: 15,
      marginLeft: 10, 
      width:'30%',
      alignItems:"center"
    }
  })