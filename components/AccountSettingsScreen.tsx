import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";
import AllAPis from "./AllApis";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

function AccountSettingScreen({route, navigation}): React.JSX.Element {
    const {isReal, spreadFrom, commision, swaps, maxLeverage, minDeposit} = route.params;
    const [balance, setbalance] = useState('$')
    const [leverageValue, setleverageValue] = useState('');
    const data = [{label : "1:1000", value : 0.001},{label : "1:500", value : 0.002}, {label : "1:200", value : 0.005}, {label : "1:100", value : 0.01}, 
        {label : "1:50", value : 0.02}, {label : "1:30", value : 0.033}, {label : "1:25", value : 0.04}, {label : "1:15", value : 0.066}, 
        {label : "1:5", value : 0.2}, {label : "1:1", value : 1}
     ]



    const handlebalance = (value) => {
      
      if(value === ''){
        setbalance('$')
        return
    }else{
      setbalance(value)
    }
  }
    const createDemoAccount = async () => {
      const allapis = new AllAPis();
      const apiData = {
        clientGuid : await AsyncStorage.getItem("clientguid"),
        swaps : swaps,
        maxLeverage : maxLeverage,
        commision : commision,
        leverage : leverageValue,
        balance : balance.substring(1, balance.length)
      }

      const res = await fetch( allapis.webApiUrl + 'DemoAccount/createdemoaccount', {
        method: 'POST',
         headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
       });

      const data = await res.json();
      await AsyncStorage.setItem("isReal", '' + isReal);
      if(data.isAddedsuccessfully){
        await AsyncStorage.setItem("isNewDemoAccountAdded", 'true')
        Alert.alert("", "Your demo account is ready!")
        navigation.navigate('HomeScreen', {
          intialRoute : 'Accounts',
          key : Math.random()
        })
      }
    }

    return (
        <LinearGradient colors={['#133756', '#2A78BC']} style={styles.mainContainer}>
            <Text style={styles.label}>Leverage</Text>
                <Dropdown placeholder='Select' data={data} style={styles.inputcc} maxHeight={300} labelField="label" 
                valueField="value" value={leverageValue} onChange={item => {setleverageValue(item.value)}}/>
                {!isReal ? 
                <View>
                    <Text style={styles.labelbalance}>Balance</Text>
                    {/* <Text style={styles.dollar}>$</Text> */}
                    <TextInput style={styles.inputcpw} onChangeText={handlebalance} value={balance} 
                    placeholder="" placeholderTextColor={'#71797E'} keyboardType="numeric"/> 
                </View>: <View></View>}
                <TouchableOpacity style={styles.signinButton} onPress={createDemoAccount}>
                    <Text style={styles.signinText}>CREATE TRADING ACCOUNT</Text>
                </TouchableOpacity>
        </LinearGradient>
    );
  }
  
  export default AccountSettingScreen;

  const styles = StyleSheet.create({
    dollar : {
        top: 183.5,
        left : '7.5%',
        fontSize: 18,
        fontWeight : 'bold',
        color : 'black',
        zIndex:10
    },
    labelbalance : {
        fontSize: 16,
        color : 'white',
        position:'absolute',
        top: 143,
        left: '11%'
    },
    label : {
        fontSize: 16,
        color : 'white',
        position:'absolute',
        top: 85,
        left: '11%'
    },
    inputcc : {
        backgroundColor: '#F8F1F1',
        top: 115,
        left: '5%',
        width: '90%',
        height: 50,
        paddingLeft: 20,
        borderRadius: 24,
        fontSize: 15,
        fontFamily: 'Lato',
      },
    mainContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      signinButton : {
        backgroundColor: '#FF914D',
        position: 'absolute',
        width: '90%',
        top: '80%',
        left: '5%',
        height: 50,
        borderRadius: 24,
        alignItems : 'center'
      },
      signinText : {
        color: 'black',
        fontSize: 16,
        top: 13,
        fontFamily: 'Lato',
        fontWeight : 'bold'
      },
      inputcpw : {
        backgroundColor: '#F8F1F1',
        top: 145,
        left: '5%',
        width: '90%',
        height: 50,
        borderRadius: 24,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Lato',
        paddingLeft: 14
      }
    })