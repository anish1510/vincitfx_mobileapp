import { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";

function ResetPasswordScreen({navigation}): React.JSX.Element {

    const [email, setEmail] = useState('');

    const handleBack = () => {
        navigation.navigate('LoginScreen')
    }

    const handleResetPassword = async () => {
        const response = await fetch( 'https://vincitfx-web-api-a2d39a85e841.herokuapp.com/api/account/sendemail/' + email, {
            method: 'GET'
        });

        const data = await response.json();
        if(data.IsEmailSent)
            {
                Alert.alert("New password has been sent to your email.")
            }

        return;
    }

    return (
        <LinearGradient colors={['#133756', '#2A78BC']} style={styles.mainContainer} >
                <TouchableOpacity onPress={handleBack}>
                    <Image resizeMode="contain" style={styles.backimg} source={require('../images/backimg.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.welcomeText}>Enter your email{"\n"}address</Text>
                <View>
                    <Image style={styles.emailIcon} resizeMode="contain" source={require('../images/email.png')} />
                    <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email Address" placeholderTextColor={'#71797E'} underlineColorAndroid="transparent"/>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleResetPassword}>
                    <Text style={styles.loginText}>Reset Password</Text>
                </TouchableOpacity>
        </LinearGradient>
)
  }
  
  export default ResetPasswordScreen;

  const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      backimg : {
        top: 40,
        left: '5%'
    },
    title : {
        color: '#F8F1F1',
        fontSize: 21,
        top:10,
        left: '26%',
        fontFamily: 'Lato'
    },
    welcomeText : {
        color: '#F8F1F1',
        fontSize: 28,
        fontFamily: 'Lato',
        top: 100,
        left: '5%',
        fontWeight: 'bold'
      },
      emailIcon : {
        top: 131,
        left: '7%',
        zIndex: 10,
        width: 30
      },
      input : {
        backgroundColor: '#F8F1F1',
        top: 95,
        left: '5%',
        width: '90%',
        height: 50,
        paddingLeft: 50,
        borderRadius: 6,
        fontFamily: 'Lato',
        fontSize: 15,
        textDecorationLine : 'none'
      },
      loginButton : {
        backgroundColor: '#49BEB7',
        width: '90%',
        top: 115,
        left: '5%',
        height: 50,
        borderRadius: 6
      },

      loginText : {
        color: '#F8F1F1',
        fontSize: 18,
        left: '27%',
        top: 10,
        fontWeight: 'bold',
        fontFamily: 'Lato'
      }
  })