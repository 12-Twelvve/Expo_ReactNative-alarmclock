import { StyleSheet,Text,View, TouchableHighlight, TextInput,  Modal, Pressable } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';
import { Ionicons } from '@expo/vector-icons';
import React, {useEffect, useState} from 'react'

const Timerv2 = () => {
   const [timerStart, setTimerStart] = useState(false)
   const [totalDuration, setTotalDuration] = useState(0)
   const [timerReset, setTimerReset] = useState(false)
   const [currentTime, setCurrentTime] = useState('')
   const [isOpen, setIsOpen] = useState(false)
   const [hour, setHour] = useState(0)
   const [min, setMin] = useState(0)

   const handleTimerComplete =()=>{
    console.log('handle complete')
   }
   const toggleTimer =()=>{
    setTimerStart(!timerStart)
    setTimerReset(false)
    }
    const resetTimer =()=>{
        setTimerStart(false)
        setTimerReset(true)
    }
   const getFormattedTime =(time)=>{
    setCurrentTime(time)
   }
   const toggleSetDuration=()=>{
        setIsOpen(true)
   }
   const toggleCloseModal =()=>{
    let tmphrMilli = hour * 3600000
    let tmminMilli = min * 60000
    setTotalDuration(tmminMilli+tmphrMilli)
    setIsOpen(false)
    setHour(0)
    setMin(0)
    resetTimer()
   }
   const toggleOpenModal =()=>{
    setIsOpen(true)
   }
  return (
    <View style={styles.box}>
          <Timer
          totalDuration={totalDuration} 
          msecs 
          start={timerStart}
          reset={timerReset}
          handleFinish={handleTimerComplete}
          getTime={getFormattedTime} 
          />
        <View style={styles.centeredIcon}>
          <TouchableHighlight onPress={toggleTimer}>
              {timerStart?
              ( <Ionicons name="stop-circle" size={50} color="#F27405" />)
              :
              ( <Ionicons name="play" size={50} color="#F27405" />)
            }
          </TouchableHighlight>
          <TouchableHighlight onPress={resetTimer}>
                <Ionicons name="reload-circle" size={50} color="#F27405" />
          </TouchableHighlight>
          <TouchableHighlight onPress={toggleOpenModal}>
              <Ionicons name="timer" size={50} color="#F27405" />
          </TouchableHighlight>
        </View>
        <Modal 
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(!isOpen);
        }}
        >
          <View style={sty.centeredView}>
          <View style={sty.modalView}>
              <TextInput
              onChangeText={setHour}
              value={hour}
              placeholder="hours"
              keyboardType="numeric"/>
              <TextInput
              onChangeText={setMin}
              value={min}
              placeholder="minutes"
              keyboardType="numeric"/>
            <Pressable
              style={[sty.button, sty.buttonClose]}
              onPress={toggleCloseModal}
            >
              <Text style={sty.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
        </Modal>
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

const sty = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Timerv2


