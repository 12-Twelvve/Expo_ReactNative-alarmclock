import { View, Text,StyleSheet, TouchableHighlight } from 'react-native'
import React, {useState} from 'react'
import Timerv2 from './Timerv2';

export default function TimerStop() {

    return (
        <View style={styles.container}>
            <Text style={{color:"white", fontSize:30}}>Timer</Text>
            <Timerv2/>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:"#1A1A1A",
        justifyContent:"center",
        height:"100%",
        alignItems:"center",
        paddingTop: 42,
    },
    timer:{
      alignContent:"center",

    }
})