import { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import axios from 'axios';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    return false;
  }
};

const fetchLocation = async (setLocation) => {
  const permissionGranted = await requestLocationPermission();

  if (permissionGranted) {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        console.log(error.code, error.message);
        setLocation(null);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
};
 export default function loc_update(){
  const [location, setLocation] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchLocation(setLocation);
    }, 8000); 
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    if (location !== null) {
      const reff = database();
      const drv = reff.ref('Driver');
      const samp = drv.child('2a');
      console.log(location.coords.latitude,location.coords.longitude)
      samp.update({"loc":`${location.coords.latitude},${location.coords.longitude}`})
      console.log(1)
      axios.get('https://update-eta-beige.vercel.app/2a')
    }
  }, [location]);
 }
