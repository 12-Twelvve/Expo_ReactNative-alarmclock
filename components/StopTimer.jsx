import { View, Text,StyleSheet, TouchableHighlight } from 'react-native'
import React, {useState} from 'react'
import RNStopWatch from './RNStopWatch';
import StopWatchv2 from './StopWatchv2';
export default function StopTimer() {

    return (
        <View style={styles.container}>
            <Text style={{color:"white", fontSize:30}}>StopWatch</Text>
            {/* <RNStopWatch/> */}
            <StopWatchv2/>
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