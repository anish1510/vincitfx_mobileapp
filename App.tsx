
import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';
import AuthLoginScreen from './components/AuthLoginScreen';
import SignUpScreen from './components/SignUpScreen';
import ResetPasswordScreen from './components/ResetPassword';
import NotificationScreen from './components/NotificationScreen';
import AddAccountScreen from './components/AddAccountScreen';
import AccountSettingScreen from './components/AccountSettingsScreen';
import { AccountsScreen } from './components/AccountsScreen';
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoginScreen">
      <Stack.Screen name="AuthLoginScreen" component={AuthLoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="HomeScreen" component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{headerShown: false}}/>
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{headerShown: false}}/>
        <Stack.Screen name="AddAccountScreen" component={AddAccountScreen} options={{ title: 'Create your account' }}/>
        <Stack.Screen name="AccountSettingScreen" component={AccountSettingScreen} options={{ title: 'VincitFXGo Settings' }}/>
        <Stack.Screen name="AccountsScreen" component={AccountsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
