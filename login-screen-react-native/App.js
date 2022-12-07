import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect} from "react";
import { firebase } from "./config.js"
import { Tabs } from "./components/Tabs.js";

import LoginScreen from "./src/LoginScreen.js";
import SignUpScreen from "./src/SignUpScreen.js";
import HomeScreen from "./src/HomeScreen.js";

// import Header from "./components/Header.js";


const Stack = createNativeStackNavigator();


function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if(initializing) setInitializing(false);
  }
  useEffect(() =>  {
    const client = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return client;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name = 'Login' 
          component={LoginScreen}
          options={{ 
            headerShown: false
            }}
        />
        <Stack.Screen
          name = 'SignUp' 
          component={SignUpScreen}
          options={{ 
            headerShown: false
            }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
          name = 'Home' 
          component={HomeScreen}
          options={{ 
            headerShown: false
            }}
        />
    </Stack.Navigator>
  );
}


export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}



