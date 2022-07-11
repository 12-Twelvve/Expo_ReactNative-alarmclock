import { StyleSheet,Text,View, TouchableHighlight } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { Ionicons } from '@expo/vector-icons';
import React, {useEffect, useState} from 'react'


const StopWatchv2 = () => {
    const [stopwatchStart, setstopwatchStart] = useState(false)
    const [stopwatchReset, setstopwatchReset] = useState(false)
    const [currentTime, setCurrentTime] = useState('')
    const [laps, setLaps] = useState([])
    const toggleStopWatch =()=>{
        setstopwatchStart(!stopwatchStart)
        setstopwatchReset(false)
    }
    const resetStopWatch =()=>{
        setstopwatchStart(false)
        setstopwatchReset(true)
        setLaps([])
    }
    const lapStopWatch=()=>{
      setLaps([...laps, currentTime])
    }
    const getFormattedTime =(time)=>{
        setCurrentTime(time)
    }
    useEffect(()=>{
      console.log(laps)
    },[laps])
  return (
    <View style={styles.box}>
        <Stopwatch  
          start={stopwatchStart}
          msecs
          reset={stopwatchReset}
          laps={true}
          startTime={0}
          getTime={getFormattedTime} 
          />
        <View style={styles.centeredIcon}>
          <TouchableHighlight onPress={toggleStopWatch}>
                {stopwatchStart?
                ( <Ionicons name="stop-circle" size={50} color="#F27405" />)
                :
                ( <Ionicons name="play" size={50} color="#F27405" />)
              }
          </TouchableHighlight>
          <TouchableHighlight onPress={resetStopWatch}>
                <Ionicons name="reload-circle" size={50} color="#F27405" />
          </TouchableHighlight>
          <TouchableHighlight onPress={lapStopWatch}>
            <Ionicons name="stopwatch" size={50} color="#F27405" />
          </TouchableHighlight>
        </View>
        <View style={styles.laps}>
            {laps.map((l)=>{
              return (
              <View >
               <Text style ={styles.text}>{l}</Text>
             </View>
             )
            })}
        </View>
      </View>
  )
}
const styles = StyleSheet.create({
  box:{
    flex:1,
    marginTop: 22  
  },
  centeredIcon: {
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
  },
  laps:{
    marginTop: 32,
    alignItems: "center",
  },
  text:{
    color:"white",
    fontSize:30
  }
});

export default StopWatchv2


