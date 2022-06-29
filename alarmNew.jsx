import { View, Text, StyleSheet, Modal , Pressable, FlatList, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Styles } from './HomeScreen'
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import {Switch} from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage';


// import ReactNativeAN from 'react-native-alarm-notification';

export default function Alarm() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [alarms, setAlarms] = useState([])
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  // const alarmNotifData = {
  //   title: "Alarm",
  //   message: "wake up",
  // };
  const getAlarms =async()=>{
    const alarmsStorage = await AsyncStorage.getItem('alarms')
    setAlarms(alarmsStorage)
  }

  const handleConfirm = async(date) => {
    hideTimePicker();
    console.log(date)
    var newDate = moment(date).add(1, 'd').toDate();
    // const fireDate = ReactNativeAN.parseDate(datee);
    const hr = moment(date).format('hh')
    const min =moment(date).format('mm')
    const status =false
    const alarmItem = {hr, min, status}
    // const alarmsStorage = await AsyncStorage.getItem('alarms')
    // if (alarmsStorage != null){
    //   setAlarms(alarmsStorage)
    //   setAlarms([...alarmItem])
    // }else{
    //   setAlarms([alarmItem])
    // }
    setAlarms([...alarms, alarmItem])
    // await AsyncStorage.setItem('alarms', JSON.stringify(alarmsStorage))
  };
  const renderAlarm = ({ item }) => {  
    return (
      <AlarmTime
        alarm={item}
        onLongPress={(e)=>prompDelete(alarm)}
      />
    );
  };
const alarmList = () => {
    // getAlarms()
    return (
        <FlatList
        data={alarms}
        renderItem={renderAlarm}
        keyExtractor={(item) => new Date()}
        />
    );
  };
const AlarmTime = ({ alarm, onLongPress }) => (
  <TouchableOpacity  onLongPress={onLongPress}>
    <View style={Styles.worldClock}>
        <View style={Styles.worldClockTime}>
            <Text style={Styles.worldClockText}>{(alarm['hr']).toString().padStart(2, "0")} :{(alarm['min']).toString().padStart(2, "0")}</Text>
        </View>
        <Switch 
          trackColor={{ false: "#767577", true: "#f27405" }}
          thumbColor={isEnabled ? "#f27405" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
  </TouchableOpacity>
);


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
            <View style={Styles.worldClock}>
              <View style={Styles.worldClockTime}>
                  <Text style={Styles.worldClockText}>05:55</Text>
              </View>
              <Switch trackColor={{ false: "#767577", true: "#f27405" }}
              thumbColor={isEnabled ? "#f27405" : "#f4f3f4"}
              //ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              />
            </View>

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
