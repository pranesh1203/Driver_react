import React, { useState,useEffect } from 'react';
import { AppRegistry, StyleSheet, Text, SafeAreaView } from 'react-native';
import Login from './login';
import Dash from './dashboard';
import auth from '@react-native-firebase/auth';
export default function App() {
  const [authenticated, setauthenticated] = useState(false);
  

  const content = authenticated ? <Dash setauthenticated={setauthenticated}/> : <Login setauthenticated={setauthenticated} />;

  return (
    <SafeAreaView style={styles.main}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

AppRegistry.registerComponent('Driver_react', () => App);
