import { View, Text, StyleSheet , Image, TouchableOpacity, Modal, Button, TextInput, Alert} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllAPis from "./AllApis";
const DemoAccount = ({balance, accountid}) => {
    const [intergerbal, setintergerbal] = useState(0)
    const [account_id, setaccount_id] = useState(accountid)
    const [decimalbal, setdecimalbal] = useState('')
    const [isModalVisible, setisModalVisible] = useState(false)
    const [topupamount, settopupamount] = useState('');
    useEffect(() => {
        const setBalance = () => {
            const intpart = balance
            setintergerbal(Math.trunc(intpart));
            let decpart = (intpart - Math.trunc(intpart)).toString().split('.')[1]
            if(decpart != null){
                let decpart2 = '' + decpart.substring(0,2)
                setdecimalbal(decpart2);
            }else{
                setdecimalbal('00');
            }

        }
    
        setBalance();
    }, [])

    const addTopUpAmount = async () => {
        const topup = parseFloat(topupamount);
        const newBalance = balance + topup;
        const intpart = newBalance
        setintergerbal(Math.trunc(intpart));
        let decpart = (intpart - Math.trunc(intpart)).toString().split('.')[1]
        if(decpart != null){
            let decpart2 = '' + decpart.substring(0,2)
            setdecimalbal(decpart2);
        }else{
            setdecimalbal('00');
        }
        setisModalVisible(false)
        const allapis = new AllAPis();
        const apiData = {
            accountid: account_id[0],
            balance: newBalance
        }
        Alert.alert(JSON.stringify(apiData))

        const res = await fetch(allapis.webApiUrl +  'DemoAccount/addtopup', {
            method: 'POST',
             headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiData),
           });

        const data = await res.json();
    }


    return (
        <View>
        <TouchableOpacity>
        <View style={styles.mainContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require('../images/logo.png')} />
            <View style={{backgroundColor : 'black', width : 45, borderRadius : 6, alignItems:'center', height : 20, left : '84%', top:5, justifyContent:'center'}}>
                <Text style={{color:'#DDDDDD', fontSize:11}}>Demo</Text></View>
            <Text style={{ position: 'absolute', color:'black', top:48, right: '5%', fontSize:24, fontWeight:'900', zIndex: 10}}>${intergerbal}.<Text 
            style = {{fontSize: 18, fontWeight:'bold'}}>{decimalbal}</Text></Text>
            <Text style={{ position: 'absolute',color:'grey', top:60, left: '3%'}}>{accountid}</Text>
            <View style={{ position: 'absolute',height: 1, backgroundColor : 'grey', width : '95%', left:'2%', top:90}}/>
            <View style={{alignItems:'center', flex: 1, justifyContent: 'center', flexDirection:'row', top:30}}>
            <TouchableOpacity style={{flex:1,flexDirection:'row',  justifyContent: 'center', alignItems: 'center'}} onPress={() => setisModalVisible(true)}>
                <Ionicons  name={"card"} size={35} color={"#133756"}/>
                <Text style={{fontSize:20, color:'#133756', fontWeight:'bold'}}>TOP UP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons style={{}} name={"stats-chart"} size={28} color={"#133756"}/>
                <Text style={{fontSize:20, color:'#133756', fontWeight:'bold'}}>TRADE</Text>
            </TouchableOpacity> 
            </View>
        </View>
        </TouchableOpacity>
        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={{backgroundColor:'black', height:200, width:'90%', borderWidth:2, top:'50%', left:'5%', borderRadius:30}}>
                    <Text style={{top:10, fontSize:24, color:'white',left: '10%', fontWeight:'900'}}>Top up your demo {"\n"}account</Text>
                    <TextInput  style={{color:'white', top:24, left:'10%', width:250, height:50, borderWidth:2, borderColor:'white', borderRadius:30, paddingLeft:20}} 
                    onChangeText={settopupamount} value={topupamount} placeholder="Top-up amount" placeholderTextColor={'white'}
                    keyboardType="numeric"/>
                    <View style={{flex:1, flexDirection:'row', top:40, left:'55%'}}>
                    <TouchableOpacity onPress={()=> setisModalVisible(false)} style={{right:30}}>
                        <Text style={{color:'white', fontSize:18}}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> addTopUpAmount()} >
                        <Text style={{color:'#FF914D', fontSize:18}}>TOP UP</Text>
                    </TouchableOpacity>
                    </View>

                </View>
        </Modal>
        </View>
    );
  }
  
  export default DemoAccount;

  const styles = StyleSheet.create({
    mainContainer : {
        position: 'relative',
        top: 20,
        left : '3%',
        width : '94%',
        height : 150,
        borderWidth : 1,
        borderColor : 'white',
        borderRadius : 24,
        backgroundColor : '#DDDDDD',
        marginBottom : 10
    },
    logo : {
        position : 'absolute',
        width: 25,
        left: '4%',
        top : -45
    }

  })