import { View, Text, StyleSheet, Modal , Pressable} from 'react-native'
import React, { useState } from 'react'
import { Styles } from './HomeScreen'
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import ReactNativeAN from 'react-native-alarm-notification';

export default function Alarm() {

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
  };
  
  const handleConfirm = (datee) => {
    hideTimePicker();
    var newDate = moment(datee).add(1, 'd').toDate();
    const fireDate = ReactNativeAN.parseDate(datee);

  };
  const addAlarm = async(fireDate)=>{
    console.log('i was here')
    await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate })
    console.log('i was here 2')

  } 
  const deleteAlarm = (addAlarm)=>{
    ReactNativeAN.deleteAlarm(addAlarm.id);
  }
  const stopAlarm =()=>{
    ReactNativeAN.stopAlarmSound();
  }
  const getAlarm =()=>{
    const alarms = async()=> await ReactNativeAN.getScheduledAlarms();
    return alarms
  }
  
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
            {getAlarm()}

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
