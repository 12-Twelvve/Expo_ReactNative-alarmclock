import { View, Text, StyleSheet, Modal , Pressable, FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Styles } from './HomeScreen'
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import {Switch} from '@rneui/themed'
import storage from './Storage';
import { Audio } from 'expo-av';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ReactNativeAN from 'react-native-alarm-notification';

export default function Alarm() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [alarms, setAlarms] = useState([])
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };  
  const alarmNotifData = {
    title: "Alarm",
    message: "wake up",
    channel: "my_channel_id",
	  small_icon: "ic_launcher",
    color:"red",

  };
  const getSaveAlarms =()=>{
    storage.load({
      key: 'alarms',
      autoSync: true,
      syncInBackground: true,
    })
    .then(ret => {
      setAlarms(ret.alarms)
    })
    .catch(err => {
      console.warn(err.message);
    });
}
  const removeStorage =()=>{
    storage.remove({
      key: 'alarms'
    });
  }
  const handleConfirm = async(date) => {
    hideTimePicker();
    getSaveAlarms()
    const hr = moment(date).format('HH') 
    const min =moment(date).format('mm')
    const status =false
    const alarmItem = {hr, min, status}
    alarms.push(alarmItem)
    var alarmData ={
      alarms
    }
    storage.save({
      key:'alarms',
      data:alarmData,
      expires:null,
    })
  };
  const renderAlarm = ({ item, index }) => {  
    return (
      <AlarmTime
        alarm={item}
        index={index}
        onLongPress={(e)=>prompDelete(index)}
      />
    );
  };
  const prompDelete =(index)=>{

  }
  const alarmList = () => {
    return (
        <FlatList
        data={alarms}
        renderItem={renderAlarm}
        keyExtractor={(item, index) => index}
        />
    );
  };
  const toggleSwitch = (index) => {
    setIsEnabled(previousState => !previousState)
    var tempAlarms = alarms
    tempAlarms[index]["status"] = !tempAlarms[index]["status"]
    setAlarms(tempAlarms)
    var alarmData ={
      alarms
    }
    storage.save({
      key:'alarms',
      data:alarmData,
      expires:null,
    })
  };
  const AlarmTime = ({ alarm,index, onLongPress }) => (
  <TouchableOpacity  onLongPress={onLongPress}>
    <View style={Styles.worldClock}>
        <View style={Styles.worldClockTime}>
            <Text style={Styles.worldClockText}>{(alarm['hr']).toString().padStart(2, "0")} :{(alarm['min']).toString().padStart(2, "0")}</Text>
        </View>
        {console.log(index,alarm['status'])}
        <Switch style={{alignSelf:'flex-end'}}
          trackColor={{ false: "#767577", true: "#f27405" }}
          thumbColor={alarm['status'] ? "#f27405" : "#f4f3f4"}
          onValueChange={()=>toggleSwitch(index)}
          value={alarm['status']}
        />
      </View>
  </TouchableOpacity>
);
// play sound   ---------------------------
const [sound, setSound] = useState();
const [play, setPlay] = useState(false)
const checkAlarm =()=>{
  const dt = new Date()
  const hr = moment(dt).format('HH') 
  const min =moment(dt).format('mm')
  alarms.map((al)=>{
    if (!play){
      if (al['status']){
        if (al['hr'] ==hr){
          if (al['min']==min){
            setPlay(true)
            playSound()
          }
        }
      }
    }
  })
}
async function playSound() {
  console.log('Loading Sound');
  const { sound } = await Audio.Sound.createAsync(
     require('./assests/sound.mp3')
  );
  setSound(sound);
  console.log('Playing Sound');
    await sound.playAsync(); 
}

useEffect(() => {
  return sound
    ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync(); 
        setPlay(false)
      }
    : undefined;
}, [sound]);
// ----------------------------------------

useEffect(()=>{
  getSaveAlarms()
  const interval = setInterval(() => {
    checkAlarm()
    // for every 30 sec
  }, 30000);
  // removeStorage()
}, [alarms, isEnabled])


  // const addAlarm = async(fireDate)=>{
  //   console.log('i was here')
  //   await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate })
  //   console.log('i was here 2')

  // } 
  // const deleteAlarm = (addAlarm)=>{
  //   ReactNativeAN.deleteAlarm(addAlarm.id);
  // }
  // const stopAlarm =()=>{
  //   ReactNativeAN.stopAlarmSound();
  // }
  // const getAlarm =()=>{
  //   const alarms = async()=> await ReactNativeAN.getScheduledAlarms();
  //   return alarms
  // }
  return (
    <View style={Styles.container}>
            <View style={Styles.homecontent}>
              <Pressable
                onPress={showTimePicker}
              >
                <View style={Styles.plus}>
                    <AntDesign name="plus" size={30} color="#F27405" />
                </View>
              </Pressable>
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirm}
                  onCancel={hideTimePicker}
                />
                <Text style={Styles.text}>Alarm</Text>
            </View>
            {/* alarm list  */}
            {/* <View style={Styles.worldClock}>
              <View style={Styles.worldClockTime}>
                  <Text style={Styles.worldClockText}>05:55</Text>
              </View>
              <Switch trackColor={{ false: "#767577", true: "#f27405" }}
              thumbColor={isEnabled ? "#f27405" : "#f4f3f4"}
              //ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              />
            </View> */}

            {alarmList()}

        </View>
  )
}


const styles = StyleSheet.create({
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
