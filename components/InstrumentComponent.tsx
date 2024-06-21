import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function InstrumentComponent({instrumentname, bid , ask}): React.JSX.Element {

    return (
        <KeyboardAwareScrollView>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', borderColor:'grey', borderWidth:2}}>
                <View style={{flex:1, alignSelf:'flex-start', paddingLeft:10}}>
                    <Text style={{}}>{instrumentname}</Text>
                </View>
                
                <View style={{alignItems:'flex-end', paddingRight:10}}>
                <Text>{bid}</Text>
                <Text>{ask}</Text>
                </View>

            </View>
        </KeyboardAwareScrollView>
    );
  }
  
  export default InstrumentComponent;