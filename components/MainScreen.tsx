
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import  Ionicons from 'react-native-vector-icons/Ionicons';
import { AccountsScreen } from "./AccountsScreen";
import PortfolioScreen from "./PortfolioScreen";
import TradeScreen from "./TradeScreen";
import SettingScreen from "./SettingScreen";


const MainScreen = ({route, navigation}) => {
    const {initialRoute, key} = route.params;
    const accountName = 'Accounts';
    const portfolioName = 'Portfolio';
    const tradeName = 'Trade';
    const settingName = 'Settings';

    const Tab = createBottomTabNavigator();

    return (
            <Tab.Navigator  key={key}
            initialRouteName={initialRoute}
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#FF914D',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {paddingBottom : 10, height:70, backgroundColor:'#133756'},
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if(rn === accountName) {
                        iconName = focused ? 'home' : 'home-outline';
                    }
                    else if(rn === portfolioName) {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    }else if(rn === tradeName) {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                    }else if(rn === settingName){
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                     return <Ionicons name={iconName} size={size} color={color}/>
                    }})
                    
                    }>
                    <Tab.Screen name={accountName} component={AccountsScreen} options={{headerShown: false}}/>
                    <Tab.Screen name={portfolioName} component={PortfolioScreen} options={{headerShown: false}}/>
                    <Tab.Screen name={tradeName} component={TradeScreen} options={{headerShown: false}}/>
                    <Tab.Screen name={settingName} component={SettingScreen} options={{headerShown: false}}/>

            </Tab.Navigator>
    );
  }
  
  export default MainScreen;
  