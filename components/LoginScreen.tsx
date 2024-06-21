import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalFont from 'react-native-global-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({navigation}) => {

    React.useEffect(() => {
      GlobalFont.applyGlobal('Lato');  // Apply the font globally
    }, []);
    const [loginData, setLoginData] = useState({
      email: '',
      password: ''
    })

    const handleChange = (name, value) => {
      setLoginData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };
    const handleLoign = async () => {

      const res = await fetch('https://vincitfx-web-api-a2d39a85e841.herokuapp.com/api/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      Alert.alert('ada')
      const data = await res.json();

      if(data.id > 0)
        {
          await AsyncStorage.setItem("isAuthenticated", 'true');
          await AsyncStorage.setItem("clientguid", data.clientguid);
          navigation.navigate('HomeScreen', {
            intialRoute : 'Accounts'
          })
        }

    }

    const handleSignUp = () => {
      navigation.navigate('SignUpScreen')
    }

    const handleResetPassword = () => {
      navigation.navigate('ResetPasswordScreen')
    }

    return (

      <KeyboardAwareScrollView style={{ flex: 1 }} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
        <LinearGradient colors={['#133756', '#2A78BC']}  style={styles.mainContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../images/logo.png')} />
          <Text style={styles.welcomeText}>Hi there! {"\n"}Welcome to {"\n"}VincitFX.</Text>
          <View>
            <Image style={styles.emailIcon} resizeMode="contain" source={require('../images/email.png')} />
            <TextInput style={styles.input} onChangeText={value => handleChange('email', value)} value={loginData.email} placeholder="Email" placeholderTextColor={'#71797E'} underlineColorAndroid="transparent"/>
          </View>
          <View>
            <Image style={styles.emailIcon} resizeMode="contain" source={require('../images/key.png')} />
            <TextInput style={styles.input} onChangeText={value => handleChange('password', value)} value={loginData.password} placeholder="Password" placeholderTextColor={'#71797E'} secureTextEntry={true} underlineColorAndroid="transparent" />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLoign}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signinButton} onPress={handleSignUp}>
            <Text style={styles.signinText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.forgotText} onPress={handleResetPassword}>I forgot my password?</Text>
        </LinearGradient>
        </KeyboardAwareScrollView>
    );
  };
  
  export default LoginScreen;

  const styles = StyleSheet.create({

    mainContainer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },

    logo : {
      width: 90,
      top: 25,
      left:'5%'
    },

    welcomeText : {
      color: '#F8F1F1',
      fontSize: 34,
      fontFamily: 'Lato',
      top: 20,
      left: '5%',
      fontWeight: 'bold'
    },

    input : {
      backgroundColor: '#F8F1F1',
      top: 55,
      left: '5%',
      width: '90%',
      height: 50,
      paddingLeft: 50,
      borderRadius: 6,
      fontFamily: 'Lato',
      fontSize: 15,
      textDecorationLine : 'none'
    },

    emailIcon : {
      top: 91,
      left: '7%',
      zIndex: 10,
      width: 30
    },

    loginButton : {
      backgroundColor: '#49BEB7',
      width: '90%',
      top: 95,
      left: '5%',
      height: 50,
      borderRadius: 6
    },

    loginText : {
      color: '#F8F1F1',
      fontSize: 18,
      left: '41%',
      top: 10,
      fontWeight: 'bold',
      fontFamily: 'Lato'
    },

    signinButton : {
      backgroundColor: '#FF914D',
      width: '90%',
      top: 115,
      left: '5%',
      height: 50,
      borderRadius: 6
    },

    signinText : {
      color: 'black',
      fontSize: 18,
      left: '39%',
      top: 10,
      fontFamily: 'Lato',
      fontWeight : 'bold'
    },

    forgotText : {
      color: '#F8F1F1',
      fontSize: 16,
      top: 130,
      left: '12%',
      fontFamily: 'Lato'
    }
  });