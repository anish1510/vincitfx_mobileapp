import { View, Text, Alert } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AuthLoginScreen({navigation}): React.JSX.Element {

    useEffect(() => {
        const checkLoginStatus = async () => {
            await AsyncStorage.removeItem("isAuthenticated");
            const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
            if (isAuthenticated === 'true') {
                navigation.navigate('HomeScreen', {
                    intialRoute : 'Accounts'
                  })
            }
            else{
                
                navigation.navigate('LoginScreen');
            }
        };
    
        checkLoginStatus();
      }, [navigation]);

    return (
        <View>
        </View>
    );
  }
  
  export default AuthLoginScreen;