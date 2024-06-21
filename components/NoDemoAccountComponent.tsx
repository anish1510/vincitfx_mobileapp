import { View, Text, StyleSheet} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
const NoDemoAccount = () => {

    return (
        <View style={{width:"90%", height : 200, top : 60, left: '5%',alignItems:'center'}}>
            <Ionicons name={"cog"} size={46} color={"white"}/>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>No accounts</Text>
            <Text style={{fontSize: 14, color: 'white'}}>You don’t have demo accounts yet</Text>
        </View>
    );
  }
  
  export default NoDemoAccount;

  const styles = StyleSheet.create({

  })