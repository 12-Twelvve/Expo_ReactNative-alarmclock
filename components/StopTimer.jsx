import { View, Text,StyleSheet, TouchableHighlight } from 'react-native'
import React, {useState} from 'react'
import RNStopWatch from './RNStopWatch';

export default function StopTimer() {

    return (
        <View style={styles.container}>
            <Text style={{color:"white", fontSize:30}}>StopWatch</Text>
            <RNStopWatch/>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:"#1A1A1A",
        justifyContent:"center",
        height:"100%",
        alignItems:"center",
    },
    timer:{
      alignContent:"center",

    }
})