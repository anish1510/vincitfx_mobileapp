import { View, Text, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InstrumentComponent from "./InstrumentComponent";
import { useState } from "react";
import AllAPis from "./AllApis";

function TradeScreen({navigation}): React.JSX.Element {

    const [instrumentdata, setinstruentdata] = useState([]);
    var allInstrumentData = []

    const fetchInstrumentData = async () => {
        const allapis = new AllAPis();
        const response = await fetch( allapis.webApiUrl + 'FXCMAPI', {
            method: 'GET'
        });
        allInstrumentData.push(await JSON.stringify(response.json()))
        //const data = await response.json();
        // Alert.alert(data.length + '')
        // for(let i=0;i<data.length;i++){
        //     allInstrumentData.push(<InstrumentComponent key={Math.random()} instrumentname={data[i].instrumentName} bid={data[i].bid} ask={data[i].ask}></InstrumentComponent>)
        // }
        // setinstruentdata(allInstrumentData)
    }

    fetchInstrumentData()

    return (
        <KeyboardAwareScrollView>
            <View>
                <Text>Trade Screen</Text>
            </View>
            <View>
                {instrumentdata}
            </View>
        </KeyboardAwareScrollView>
    );
  }
  
  export default TradeScreen;