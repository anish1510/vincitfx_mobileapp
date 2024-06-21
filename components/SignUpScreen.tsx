import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform} from "react-native";
import CheckBox from '@react-native-community/checkbox'
import LinearGradient from 'react-native-linear-gradient';
import GlobalFont from 'react-native-global-font';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list'

function SignUpScreen({navigation}): React.JSX.Element {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [confirmPassword, setconfirmPassword] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [selected, setSelected] = React.useState("");
    React.useEffect(() => {
        GlobalFont.applyGlobal('Lato');  // Apply the font globally
      }, []);

    const handleBack = () => {
        navigation.navigate('LoginScreen')
    }

    const [signupData, setsignupData] = useState({
        firstName : '',
        lastName : '',
        email: '',
        phoneNumber : '',
        password: ''
      })

    const apiData = {
      firstName : '',
      lastName : '',
      email: '',
      phoneNumber : '',
      password: ''
    }

    const handleChange = (name, value) => {
        setsignupData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

    const goToLogin = () => {
        navigation.navigate('LoginScreen')
    }

    const handleSignUp = async ()=> {
        if(signupData.firstName === '' || signupData.lastName === '' || signupData.email === '' || value === null
            || signupData.phoneNumber === '' || signupData.password === '' || confirmPassword === ''){
                Alert.alert('', 'Please fill all the fields');
                return;
            }
        if(!isSelected){
            Alert.alert('', 'Please agree to the terms and conditions');
            return;
        }
        if(signupData.password != confirmPassword){
            Alert.alert('', 'Passowrd do not match')
            return;
        }

        const response = await fetch( 'https://vincitfx-web-api-a2d39a85e841.herokuapp.com/api/account/checkemailexist/' + signupData.email, {
          method: 'GET'
      });

      const data = await response.json();
      if(!data.DoesEmailExist){
        var pnwcc = value + "-" + signupData.phoneNumber

        apiData.firstName = signupData.firstName;
        apiData.lastName = signupData.lastName;
        apiData.email = signupData.email;
        apiData.password = signupData.password;
        apiData.phoneNumber = pnwcc

         const res = await fetch('https://vincitfx-web-api-a2d39a85e841.herokuapp.com/api/account/signup', {
            method: 'POST',
             headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiData),
           });
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
      else{
        Alert.alert('', 'Email already exist!')
      }


    }



    const data =[{ key : "BD", value : "+880" }, { key : "BE", value : "+32" }, { key : "BF", value : "+226" }, { key : "BG", value : "+359" }, { key : "BA", value : "+387" }, { key : "BB", value : "+1-246" }, { key : "WF", value : "+681" }, { key : "BM", value : "+1-441" }, { key : "BN", value : "+673" },
         { key : "BO", value : "+591" }, { key : "BH", value : "+973" }, { key : "BI", value : "+257" }, { key : "BJ", value : "+229" }, { key : "BT", value : "+975" }, { key : "JM", value : "+1-876" }, { key : "BW", value : "+267" }, { key : "WS", value : "+685" }, { key : "BQ", value : "+599" }, { key : "BR", value : "+55" },
          { key : "BS", value : "+1-242" }, { key : "JE", value : "+44-1534" }, { key : "BY", value : "+375" }, { key : "BZ", value : "+501" }, { key : "RU", value : "+7" }, { key : "RW", value : "+250" }, { key : "RS", value : "+381" }, { key : "TL", value : "+670" }, { key : "RE", value : "+262" }, { key : "TM", value : "+993" }, { key : "TJ", value : "+992" },
           { key : "RO", value : "+40" }, { key : "TK", value : "+690" }, { key : "GW", value : "+245" }, { key : "GU", value : "+1-671" }, { key : "GT", value : "+502" }, { key : "GR", value : "+30" }, { key : "GQ", value : "+240" }, { key : "GP", value : "+590" }, { key : "JP", value : "+81" }, { key : "GY", value : "+592" },
            { key : "GG", value : "+44-1481" }, { key : "GF", value : "+594" }, { key : "GE", value : "+995" }, { key : "GD", value : "+1-473" }, { key : "GB", value : "+44" }, { key : "GA", value : "+241" }, { key : "SV", value : "+503" }, { key : "GN", value : "+224" }, { key : "GM", value : "+220" }, { key : "GL", value : "+299" }, { key : "GI", value : "+350" },
             { key : "GH", value : "+233" }, { key : "OM", value : "+968" }, { key : "TN", value : "+216" }, { key : "JO", value : "+962" }, { key : "HR", value : "+385" }, { key : "HT", value : "+509" }, { key : "HU", value : "+36" }, { key : "HK", value : "+852" }, { key : "HN", value : "+504" }, 
             { key : "PR", value : "+1-787 and 1-939" }, { key : "PS", value : "+970" }, { key : "PW", value : "+680" }, { key : "PT", value : "+351" }, { key : "SJ", value : "+47" }, { key : "PY", value : "+595" }, { key : "IQ", value : "+964" }, { key : "PA", value : "+507" }, { key : "PF", value : "+689" }, { key : "PG", value : "+675" },
              { key : "PE", value : "+51" }, { key : "PK", value : "+92" }, { key : "PH", value : "+63" }, { key : "PN", value : "+870" }, { key : "PL", value : "+48" }, { key : "PM", value : "+508" }, { key : "ZM", value : "+260" }, { key : "EH", value : "+212" }, { key : "EE", value : "+372" }, { key : "EG", value : "+20" }, { key : "ZA", value : "+27" },
               { key : "EC", value : "+593" }, { key : "IT", value : "+39" }, { key : "VN", value : "+84" }, { key : "SB", value : "+677" }, { key : "ET", value : "+251" }, { key : "SO", value : "+252" }, { key : "ZW", value : "+263" }, { key : "SA", value : "+966" }, { key : "ES", value : "+34" }, { key : "ER", value : "+291" }, { key : "ME", value : "+382" }, 
               { key : "MD", value : "+373" }, { key : "MG", value : "+261" }, { key : "MF", value : "+590" }, { key : "MA", value : "+212" }, { key : "MC", value : "+377" }, { key : "UZ", value : "+998" }, { key : "MM", value : "+95" }, { key : "ML", value : "+223" }, { key : "MO", value : "+853" }, { key : "MN", value : "+976" }, { key : "MH", value : "+692" },
                { key : "MK", value : "+389" }, { key : "MU", value : "+230" }, { key : "MT", value : "+356" }, { key : "MW", value : "+265" }, { key : "MV", value : "+960" }, { key : "MQ", value : "+596" }, { key : "MP", value : "+1-670" }, { key : "MS", value : "+1-664" }, { key : "MR", value : "+222" }, { key : "IM", value : "+44-1624" },
                 { key : "UG", value : "+256" }, { key : "TZ", value : "+255" }, { key : "MY", value : "+60" }, { key : "MX", value : "+52" }, { key : "IL", value : "+972" }, { key : "FR", value : "+33" }, { key : "IO", value : "+246" }, { key : "SH", value : "+290" }, { key : "FI", value : "+358" }, { key : "FJ", value : "+679" }, { key : "FK", value : "+500" }, 
                 { key : "FM", value : "+691" }, { key : "FO", value : "+298" }, { key : "NI", value : "+505" }, { key : "NL", value : "+31" }, { key : "NO", value : "+47" }, { key : "NA", value : "+264" }, { key : "VU", value : "+678" }, { key : "NC", value : "+687" }, { key : "NE", value : "+227" }, { key : "NF", value : "+672" }, { key : "NG", value : "+234" },
                  { key : "NZ", value : "+64" }, { key : "NP", value : "+977" }, { key : "NR", value : "+674" }, { key : "NU", value : "+683" }, { key : "CK", value : "+682" }, { key : "CI", value : "+225" }, { key : "CH", value : "+41" }, { key : "CO", value : "+57" }, { key : "CN", value : "+86" }, { key : "CM", value : "+237" },
                   { key : "CL", value : "+56" }, { key : "CC", value : "+61" }, { key : "CA", value : "+1" }, { key : "CG", value : "+242" }, { key : "CF", value : "+236" }, { key : "CD", value : "+243" }, { key : "CZ", value : "+420" }, { key : "CY", value : "+357" }, { key : "CX", value : "+61" }, { key : "CR", value : "+506" }, { key : "CW", value : "+599" },
                    { key : "CV", value : "+238" }, { key : "CU", value : "+53" }, { key : "SZ", value : "+268" }, { key : "SY", value : "+963" }, { key : "SX", value : "+599" }, { key : "KG", value : "+996" }, { key : "KE", value : "+254" }, { key : "SS", value : "+211" }, { key : "SR", value : "+597" }, { key : "KI", value : "+686" }, { key : "KH", value : "+855" },
                     { key : "KN", value : "+1-869" }, { key : "KM", value : "+269" }, { key : "ST", value : "+239" }, { key : "SK", value : "+421" }, { key : "KR", value : "+82" }, { key : "SI", value : "+386" }, { key : "KP", value : "+850" }, { key : "KW", value : "+965" }, { key : "SN", value : "+221" }, { key : "SM", value : "+378" }, { key : "SL", value : "+232" },
                      { key : "SC", value : "+248" }, { key : "KZ", value : "+7" }, { key : "KY", value : "+1-345" }, { key : "SG", value : "+65" }, { key : "SE", value : "+46" }, { key : "SD", value : "+249" }, { key : "DO", value : "+1-809 and 1-829" }, { key : "DM", value : "+1-767" }, { key : "DJ", value : "+253" }, { key : "DK", value : "+45" },
                       { key : "VG", value : "+1-284" }, { key : "DE", value : "+49" }, { key : "YE", value : "+967" }, { key : "DZ", value : "+213" }, { key : "US", value : "+1" }, { key : "UY", value : "+598" }, { key : "YT", value : "+262" }, { key : "UM", value : "+1" }, { key : "LB", value : "+961" }, { key : "LC", value : "+1-758" }, { key : "LA", value : "+856" },
                        { key : "TV", value : "+688" }, { key : "TW", value : "+886" }, { key : "TT", value : "+1-868" }, { key : "TR", value : "+90" }, { key : "LK", value : "+94" }, { key : "LI", value : "+423" }, { key : "LV", value : "+371" }, { key : "TO", value : "+676" }, { key : "LT", value : "+370" }, { key : "LU", value : "+352" }, { key : "LR", value : "+231" },
                         { key : "LS", value : "+266" }, { key : "TH", value : "+66" },{ key : "TG", value : "+228" }, { key : "TD", value : "+235" }, { key : "TC", value : "+1-649" }, { key : "LY", value : "+218" }, { key : "VA", value : "+379" }, { key : "VC", value : "+1-784" }, { key : "AE", value : "+971" }, { key : "AD", value : "+376" },
                          { key : "AG", value : "+1-268" }, { key : "AF", value : "+93" }, { key : "AI", value : "+1-264" }, { key : "VI", value : "+1-340" }, { key : "IS", value : "+354" }, { key : "IR", value : "+98" }, { key : "AM", value : "+374" }, { key : "AL", value : "+355" }, { key : "AO", value : "+244" }, 
                           { key : "AS", value : "+1-684" }, { key : "AR", value : "+54" }, { key : "AU", value : "+61" }, { key : "AT", value : "+43" }, { key : "AW", value : "+297" }, { key : "IN", value : "+91" }, { key : "AX", value : "+358-18" }, { key : "AZ", value : "+994" }, { key : "IE", value : "+353" }, { key : "ID", value : "+62" }, 
                           { key : "UA", value : "+380" }, { key : "QA", value : "+974" }, { key : "MZ", value : "+258" }];

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
            <LinearGradient colors={['#133756', '#2A78BC']} style={styles.mainContainer} >
                <TouchableOpacity onPress={handleBack}>
                    <Image resizeMode="contain" style={styles.backimg} source={require('../images/backimg.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Sign Up</Text>
                <View>
                    <TextInput style={styles.inputfn} onChangeText={value => handleChange('firstName', value)} value={signupData.firstName} placeholder="First Name" placeholderTextColor={'#71797E'}/>
                </View>
                <View>
                    <TextInput style={styles.inputln} onChangeText={value => handleChange('lastName', value)} value={signupData.lastName} placeholder="Last Name" placeholderTextColor={'#71797E'}/>
                </View>
                <View>
                    <TextInput style={styles.inputea} onChangeText={value => handleChange('email', value)} value={signupData.email} placeholder="Email Address" placeholderTextColor={'#71797E'}/>
                </View>
                <View>
                <Dropdown placeholder='Select' style={styles.inputcc} data={data} search maxHeight={300} labelField="value" 
                valueField="value" value={value} onChange={item => setValue(item.value)}/>
                    <TextInput style={styles.inputpn} keyboardType="numeric" onChangeText={value => handleChange('phoneNumber', value)} value={signupData.phoneNumber} placeholder="Phone Number" placeholderTextColor={'#71797E'}/>
                </View>
                <View>
                    <TextInput style={styles.inputpw} onChangeText={value => handleChange('password', value)} value={signupData.password} placeholder="Password" secureTextEntry={true} placeholderTextColor={'#71797E'}/>
                </View>
                <View>
                    <TextInput style={styles.inputcpw} onChangeText={setconfirmPassword} value={confirmPassword} placeholder="Confirm Password" secureTextEntry={true} placeholderTextColor={'#71797E'}/>
                </View>
                <Text style={styles.terms} >To improve your trading experience,
                we would like to notify you of market
                events and extreme price movements.
                By signing up, you also declare you
                read, understood, and accept our
                Privacy Policy
                </Text>
                <CheckBox value={isSelected} onValueChange={setIsSelected} style={styles.checkbox} tintColors={{ true: '#F8F1F1', false: '#F8F1F1' }}/>
                <TouchableOpacity style={styles.signinButton} onPress={handleSignUp}>
                    <Text style={styles.signinText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.already} onPress={goToLogin}>Already have an account? Log In</Text>
            </LinearGradient>
            </KeyboardAwareScrollView>

    );
  }
  
  export default SignUpScreen;

  const styles = StyleSheet.create({

    already : {
        fontSize: 16,
        color : '#F8F1F1',
        top : 100,
        left: '12%',
        width : '76%'
    },

    signinButton : {
      backgroundColor: '#FF914D',
      width: '90%',
      top: 90,
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
    checkbox : {
       top: 20,
       left: '5%'
    },
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
        left: '38%',
        fontFamily: 'Lato'
    },
    inputfn : {
        backgroundColor: '#F8F1F1',
        top: 55,
        left: '5%',
        width: '90%',
        height: 50,
        paddingLeft: 20,
        borderRadius: 6,
        fontSize: 15,
        fontFamily: 'Lato',
      },
      inputln : {
        backgroundColor: '#F8F1F1',
        top: 75,
        left: '5%',
        width: '90%',
        height: 50,
        paddingLeft: 20,
        borderRadius: 6,
        fontSize: 15,
        fontFamily: 'Lato',
      },
      inputea : {
        backgroundColor: '#F8F1F1',
        top: 95,
        left: '5%',
        width: '90%',
        height: 50,
        paddingLeft: 20,
        borderRadius: 6,
        fontSize: 15,
        fontFamily: 'Lato',
      },
      inputpn : {
        backgroundColor: '#F8F1F1',
        top: 65,
        left: '35%',
        width: '60%',
        height: 50,
        paddingLeft: 20,
        borderRadius: 6,
        fontSize: 15,
        fontFamily: 'Lato',
      },
      inputcc : {
        backgroundColor: '#F8F1F1',
        top: 115,
        left: '5%',
        width: '25%',
        height: 50,
        paddingLeft: 10,
        borderRadius: 6,
        fontSize: 15,
        fontFamily: 'Lato',
      },
      inputpw : {
        backgroundColor: '#F8F1F1',
        top: 85,
        left: '5%',
        width: '90%',
        height: 50,
        paddingLeft: 20,
        borderRadius: 6,
        fontSize: 15,
        fontFamily: 'Lato',
      },
      clearButton : {
        top : 13,
        left : 290,
      },
      inputcpw : {
        backgroundColor: '#F8F1F1',
        top: 105,
        left: '5%',
        width: '90%',
        height: 50,
        paddingLeft: 20,
        borderRadius: 6,
        fontSize: 15,
        fontFamily: 'Lato',
      },
      cancelfn: {
        width : 40
      },
      terms: {
        color: '#F8F1F1',
        top: 110,
        width: '80%',
        left: '15%',
        fontSize: 12,
        textAlign : 'justify'
      }
  })