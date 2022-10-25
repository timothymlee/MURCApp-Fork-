
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';
  
  
function triggerOff(){
    const header = ['DATE', 'LOCATION', 'DEBIT', 'CREDIT', 'BALANCE'];
    const data = [
    ['09/16/22','Union Cafe','6.75','0.00','478.23'] ,
    ['09/16/22','Union Cafe','4.75','0.00','484.98'] ,
    ['09/15/22','Union Cafe','8.75','0.00','489.73'] ,
    ['09/15/22','Union Cafe','5.95','0.00','498.48'] ,
    ['09/15/22','Union Cafe','4.75','0.00','504.43'] ,
    ['09/14/22','Union Cafe','6.75','0.00','509.18'] ,
    ['09/14/22','Union Cafe','4.75','0.00','515.93'] ,
    ['09/13/22','Union Cafe','8.75','0.00','520.68'] ,
    ['09/12/22','Union Cafe','5.95','0.00','529.43'] ,
    ['09/12/22','Union Cafe','4.75','0.00','534.18'] ,
    ['09/16/22','Union Cafe','6.75','0.00','538.23'] ,
    ['09/16/22','Union Cafe','4.75','0.00','546.75'] ,
    ['09/15/22','Union Cafe','8.75','0.00','550.75'] ,
    ['09/15/22','Union Cafe','5.95','0.00','558.97'] ,
    ['09/15/22','Union Cafe','4.75','0.00','562.43'] ,
    ['09/14/22','Union Cafe','6.75','0.00','568.18'] ,
    ['09/14/22','Union Cafe','4.75','0.00','564.93'] ,
    ['09/13/22','Union Cafe','8.75','0.00','570.68'] ,
    ['09/12/22','Union Cafe','5.95','0.00','575.43'] ,
    ['09/12/22','Union Cafe','4.75','0.00','581.18'] 
    ];
    return(
        <View style={{ marginTop: 200 }}>
        <Text style={{ fontSize: 18 }}>
            GeeksforGeeks React Native Table
        </Text>

        <Table borderStyle={{ borderWidth: 2, 
            borderColor: '#c8e1ff' }}>
            <Row data={header} />
            <Rows data={data} />
        </Table>
        </View>
    );
        
}

export default class Widget extends React.Component {
    triggerOff
}
  
