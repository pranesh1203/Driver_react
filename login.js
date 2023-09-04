import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Dimensions, View, Text, TextInput, TouchableOpacity , ActivityIndicator} from "react-native";
import auth from '@react-native-firebase/auth';

const h = Dimensions.get('window').height;

const style = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    flexDirection: 'column',
    flex: 1
  },
  head: {
    flex: 0.07,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 5,
    borderBottomColor: "#565353",
    borderBottomEndRadius: 5
  },
  title: {
    fontFamily: "Nexa-Heavy",
    fontSize: 22,
    color: "white",
  },
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10

  },
  loginBox: {
    padding: 10,
    height: h / 2,
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderBlockColor: "black",
    flexDirection: 'column',
    backgroundColor: "#EEEDED",
    alignItems: 'center',
  },
  inputbox: {
    height: h / 4,
    width: '100%',
    padding: 20,

  },
  subbut: {
    width: '100%',
    height: '20%',
    marginTop: 30,

    alignItems: 'center'
  },
  loginButton: {
    backgroundColor: "black",
    borderRadius: 5,
    padding: 15,
    width: '25%',
    alignItems: 'center'
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
});

export default function Login({setauthenticated}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const handleLogin = async () => {
    setEmailError(null);
    setPasswordError(null);

    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    setLoading(true); // Show the loader

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      setauthenticated(true);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setEmailError('User not found');
      } else if (error.code === 'auth/too-many-requests') {
        setEmailError('Too many login attempts. Please try again later.');
      } else if (error.code === 'auth/wrong-password') {
        setPasswordError('Wrong password');
      } else {
        console.error('Login failed:', error);
      }
    } finally {
      setLoading(false); // Hide the loader when login is finished
    }
  };

  return (
    <SafeAreaView style={style.main}>
      <View style={style.head}>
        <Text style={style.title}>College Bus Tracker</Text>
      </View>
      <View style={style.login}>
        <View style={style.loginBox}>
          <Text style={{ paddingTop: 20, paddingBottom: 5, fontFamily: "Nexa-Heavy", fontSize: 20,color:"black" }}>LOGIN</Text>
          <Text style={{color:"black"}}>Enter your Mail and Password</Text>
          <View style={style.inputbox}>
            <Text style={{ paddingTop: 15, paddingBottom: 5, textAlign: 'left', fontSize: 16 ,color:"black"}}>E-Mail</Text>
            <TextInput
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                color:"black",
              }}
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            {emailError && <Text style={{ color: 'red' }}>{emailError}</Text>}

            <Text style={{ paddingTop: 15, paddingBottom: 5, textAlign: 'left', fontSize: 16 ,color:"black"}}>Password</Text>
            <TextInput
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                color:"black"
              }}
              placeholder="Enter your password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            {passwordError && <Text style={{ color: 'red' }}>{passwordError}</Text>}
          </View>

          <View style={style.subbut}>
            <TouchableOpacity
              style={style.loginButton}
              onPress={handleLogin}
            >
              <Text style={style.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Conditionally render the loader */}
      {loading && (
        <View style={style.loaderContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </SafeAreaView>
  );
}