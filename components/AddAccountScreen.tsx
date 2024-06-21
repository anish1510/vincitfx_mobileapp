import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AllAPis from "./AllApis";
import { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";

function AddRealAccountScreen({route, navigation}): React.JSX.Element {
    const {isReal} = route.params;
    const [accountInfo, setaccountInfo]= useState({
        spreadFrom : "0.6",
        commision : "0",
        swaps : "No",
        maxLeverage : "1:1000",
        minDeposit : "$25"

    })

    const handleConfigure = () => {
        navigation.navigate('AccountSettingScreen', {
            isReal: isReal,
            spreadFrom : 0.6,
            commision : 0,
            swaps : "No",
            maxLeverage : 0.001,
            minDeposit : 25
        })
    }

    return (
        <KeyboardAwareScrollView style={{ flex: 0 }} contentContainerStyle={{ flexGrow : 1 }} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
            <LinearGradient colors={['#133756', '#2A78BC']} style={styles.mainContainer} >
            {isReal ? <Text style={styles.accountType}>REAL ACCOUNT</Text> : <Text style={styles.accountType}>DEMO ACCOUNT</Text>}
            
                <View style={styles.configContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../images/configLogo.png')} />
                    <Text style={styles.companyName}>VincitFXGo</Text>
                </View>
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoText}>Spread from</Text>
                    <Text style={styles.infoText}>Instant notification</Text>
                    {isReal ? <Text style={styles.infoText}>Min deposit</Text> : <Text></Text>}
                    <Text style={styles.infoText}>Swaps</Text>
                    <Text style={styles.infoText}>Maximum leverage</Text>
                    <Text style={styles.infoText}>Comission</Text>
                </View>
                <View style={styles.valueTextContainer}>
                    <Text style={styles.valueText}>{accountInfo.spreadFrom}</Text>
                    <Text style={styles.valueText}>...</Text>
                    {isReal ? <Text style={styles.valueText}>{accountInfo.minDeposit}</Text> : <Text></Text>}
                    <Text style={styles.valueText}>{accountInfo.swaps}</Text>
                    <Text style={styles.valueText}>{accountInfo.maxLeverage}</Text>
                    <Text style={styles.valueText}>{accountInfo.commision}</Text>
                </View>
                <View style={styles.infoDetailsTextContainer}>
                    <Text style={styles.detailsText}>Floating spread</Text>
                    <Text style={styles.detailsText}>Ultimate trading control 24/7</Text>
                    {isReal ? <Text style={styles.detailsText}>Favourable:$100</Text> : <Text></Text>}
                </View>
                <TouchableOpacity style={styles.signinButton} onPress={handleConfigure}>
                    <Text style={styles.signinText}>CONFIGURE</Text>
                </TouchableOpacity>
                </LinearGradient>
        </KeyboardAwareScrollView>
    );
  }
  
  export default AddRealAccountScreen;

  const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
    accountType : {
        fontSize : 20,
        fontWeight : 'bold',
        top: 20,
        color : 'white',
        alignSelf : 'center'
    },
    signinButton : {
        backgroundColor: '#FF914D',
        position: 'absolute',
        width: '70%',
        top: 460,
        left: '15%',
        height: 50,
        borderRadius: 30,
        alignItems:'center',
      },
      signinText : {
        color: 'black',
        top: 11,
        fontSize: 18,
        fontFamily: 'Lato',
        fontWeight : 'bold'
      },
    title : {
        fontSize : 21,
        color : "#121212",
        top : 30,
        left : '18%',
    },
    configContainer : {
        top : 55,
        left : '10%',
        borderColor : '#133756',
        width : '80%',
        height : 480,
        borderWidth : 1,
        borderRadius: 8,
        backgroundColor : 'white'
    },
    backarrow:{
        position: 'absolute',
        top: 30,
    },
    logo : {
        width : 40,
        top : -2,
        left : '82%'
    },
    companyName : {
        color : '#133756',
        fontSize : 18,
        fontWeight : 'bold',
        top : -53,
        left : '5%'
    },
    infoTextContainer : {
        position : 'absolute',
        top : 140,
        left : '15%'
    },
    infoText : {
        fontSize : 14,
        color : 'black',
        lineHeight : 40,
        textAlign : 'left'
    },

    valueText : {
        fontSize : 14,
        color : 'black',
        lineHeight :40,
        textAlign : 'right'
    },
    detailsText : {
        fontSize : 12,
        color : 'grey',
        lineHeight : 40,
        textAlign : 'left'
    },
    valueTextContainer : {
        position : 'absolute',
        top : 140 ,
        left : '70%'
    },
    infoDetailsTextContainer : {
        position : 'absolute',
        top : 158,
        left : '15%'

    }

  })