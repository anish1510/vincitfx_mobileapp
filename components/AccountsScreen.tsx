import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, LogBox } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import  Ionicons from 'react-native-vector-icons/Ionicons';
import {useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DemoAccount from "./DemoAccountCompoent";
import AllAPis from "./AllApis";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoDemoAccount from "./NoDemoAccountComponent";
import NoRealAccount from "./NoRealAccountComponent";
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';


export const AccountsScreen = ({route, navigation}) => {
    const [isReal, setIsReal] = useState(true)
    const [demoAccount, setdemoAccount] = useState([]);
    const [hideAddIcon, sethideAddIcon] = useState(true)
    var allDemoAccounts = []

    const handleAccount = async (value) => {
        if(value === 'real')
            {
                setIsReal(true)
                await AsyncStorage.setItem("isReal", '' + true)
            }
        else if (value === 'demo')
            {
                setIsReal(false)
                await AsyncStorage.setItem("isReal", '' + false)
            }
            GetDemoAccount();
    }

    const handleNotification = () => {
        navigation.navigate('NotificationScreen');
    }

    const handleAddAccount = async () => {
        if(demoAccount.length < 2){
            navigation.navigate('AddAccountScreen', {
                isReal: isReal
            });
        }else{
            Alert.alert("", "Cannot create more than two demo account!")
        }
    }

    const GetDemoAccount = async () => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified']);
        setdemoAccount([])
        allDemoAccounts = []
        const allapis = new AllAPis();
        const clientGuid = await AsyncStorage.getItem("clientguid")
        const response = await fetch( allapis.webApiUrl + 'DemoAccount/getalldemoaccount/' + clientGuid, {
            method: 'GET'
        });
        const data = await response.json();
        for(let i=0;i<data.length;i++){
            allDemoAccounts.push(<DemoAccount key={Math.random()} balance={data[i].balance} accountid={[data[i].accountid]}></DemoAccount>)
        }
        setdemoAccount(allDemoAccounts)
    }

    useFocusEffect(
        useCallback(() => {
            GetDemoAccount();
        }, [])
      );

    // useEffect(() => {
    //     GetDemoAccount();
    // }, [])


    const hideIcon = () => {
        if(hideAddIcon){
            sethideAddIcon(false)
        }else{
            sethideAddIcon(true)
        }
    }

    return (
        <KeyboardAwareScrollView>
        <LinearGradient colors={['#133756', '#2A78BC']} style={styles.mainContainer}>
            <Text style={styles.title}>Accounts</Text>
            <TouchableOpacity onPress={handleNotification}>
                <Ionicons style={styles.notification} name={"notifications"} size={26} color={"#FF914D"}/>
            </TouchableOpacity>
            
            <View>
            <TouchableOpacity style={[styles.toreal, isReal && styles.borderchange]} onPress={() => handleAccount('real')}>
                <Text style={[styles.totext, isReal && styles.textcc]}>REAL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.todemo, !isReal && styles.borderchange]} onPress={() => handleAccount('demo')}>
                <Text style={[styles.totext, !isReal && styles.textcc]}>DEMO</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.add} onPress={handleAddAccount}>
                <Ionicons name={"add-circle"} size={65} color={'#FF914D'}/>
            </TouchableOpacity>
            {!isReal &&  demoAccount.length > 0 ? <View style={{ alignSelf:'auto'}}>{demoAccount}</View> : !isReal
            && demoAccount.length == 0 ? <NoDemoAccount></NoDemoAccount> : isReal ? <NoRealAccount></NoRealAccount> : <View>Nothing to show</View>}
        </LinearGradient>
        </KeyboardAwareScrollView>
    );
  }
  

  const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      title : {
        color: '#F8F1F1',
        fontSize: 21,
        top:30,
        left: '35%',
        fontFamily: 'Lato'
    },
    notification : {
        left : '85%',
        top: 3
    },
    add : {
        position: 'absolute',
        bottom: 100,
        left: '75%',
        zIndex: 1
    },
    toreal : {
        top: 50,
        width: '50%',
        height : 40,
        borderBottomWidth : 3,
        borderColor: '#F8F1F1'
    },
    todemo : {
        top: 10,
        left: '50%',
        width: '50%',
        height : 40,
        borderBottomWidth : 3,
        borderColor: '#F8F1F1'
    },
    totext : {
        color : '#F8F1F1',
        left : '40%',
        fontWeight: 'bold'
    },
    borderchange : {
        borderColor : '#FF914D'
    },
    textcc : {
        color:'#FF914D',
    }
  })