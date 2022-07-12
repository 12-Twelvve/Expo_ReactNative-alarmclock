import { View, Text, StyleSheet, Modal , Pressable, FlatList, TouchableOpacity,  TouchableWithoutFeedback,} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Styles } from './HomeScreen'
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import {Switch} from '@rneui/themed'
import storage from './Storage';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

// for nfc reader ---------------------------------------------
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

// import TrackPlayer , {Capability} from 'react-native-track-player';
// import { useCurrentTrack } from './services/UseCurrentTrack';
// import { SetupService, QueueInitalTracksService } from './services/SetServices';

NfcManager.start();
// ----------------------------------------------
export default function Alarm() {
  const [deleteRender, setDeleteRender] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false);
  const [alarms, setAlarms] = useState([])
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [dindex, setdIndex] = useState('')
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
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
        onPress={(e)=>handleDeleteModal(index)}
      />
    );
  };
  const handleDeleteModal =(index)=>{
    setIsOpen(true)
    setdIndex(index)
  }
  const prompDelete =()=>{
    setDeleteRender(!deleteRender)
    setIsOpen(false)
    var tempAlarms = alarms
    var removed = tempAlarms.splice(dindex,1)
    var alarmData ={
      alarms:tempAlarms
    }
    setAlarms(tempAlarms)
    storage.save({
      key:'alarms',
      data:alarmData,
      expires:null,
    })
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
  const AlarmTime = ({ alarm,index, onPress }) => (
  <TouchableOpacity  >
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
      <View style={{marginRight:22}}>
        <Pressable onPress={onPress}>
          <Ionicons name="remove-circle-outline" size={25} color="gray" />
        </Pressable>
      </View>
    </View>
  </TouchableOpacity>
);

// =======================================
// another playCard
// const playTrack =()=>{
//   const track = useCurrentTrack();
// }
// const [isPlayerReady, setIsPlayerReady] = useState(false);
// useEffect(() => { 
//   async function run() {
//     const isSetup = await SetupService();
//     setIsPlayerReady(isSetup);

//     const queue = await TrackPlayer.getQueue();
//     if (isSetup && queue.length <= 0) {
//       await QueueInitalTracksService();
//     }
//   }
//   run();
// }, []);

//  play sound by react native audio track
// const playAudioTrack = async()=>{
//   await TrackPlayer.setupPlayer()
//   const track = {
//     url: require('./assests/sound.mp3'),
//     title: 'Alarm',
//     artist: 'deadman',
//     duration: 166
//     };
//   await TrackPlayer.add([track]);
//   TrackPlayer.updateOptions({
//         capabilities: [
//             Capability.Play,
//             Capability.Stop,
//         ],
//         // compactCapabilities: [Capability.Play, Capability.Stop],
//     });
//   TrackPlayer.play();
// }
// const stopAudioTrack =()=>{
//       TrackPlayer.stop()
// }
// play sound   ---------------------------
const [sound, setSound] = useState();
const [play, setPlay] = useState(false)
const checkAlarm =()=>{
  const dt = new Date()
  const hr = moment(dt).format('HH') 
  const min =moment(dt).format('mm')
  alarms.map((al)=>{
    if (!play){
      if (al['status'] && al['hr']==hr && al['min']==min){
            setPlay(true)
            playSound()
            // playAudioTrack()
          }
    }
  })
}
async function playSound() {
  try{
    const permission = await Audio.requestPermissionsAsync();
  }catch(err){
    console.log(err)
  }
  console.log('Loading Sound');
  Audio.setAudioModeAsync({
    // allowsRecordingIOS: false,
    staysActiveInBackground: true,
    playsInBackgroundModeAndroid: true,
    // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    // playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    playThroughEarpieceAndroid: false
    });
  const { sound } = await Audio.Sound.createAsync(
     require('./assests/sound.mp3')
  );
  setSound(sound);
  console.log('Playing Sound');
    await sound.playAsync(); 
    await sound.setIsLoopingAsync(true)
}
async function stopSound(){
  console.log('stopping sound')
  await sound.stopAsync()
  sound.unloadAsync(); 
  setPlay(false)
}
// stop sound by nfc ----------------------
async function readNdef() {
  try {
    // register for the NFC tag with NDEF in it
    await NfcManager.requestTechnology(NfcTech.Ndef);
    // the resolved tag object will contain `ndefMessage` property
    const tag = await NfcManager.getTag();
    console.warn('Tag found', tag);
    // stop alarm function -------
    stopSound()

  } catch (ex) {
    console.warn('Oops!', ex);
  } finally {
    // stop the nfc scanning
    NfcManager.cancelTechnologyRequest();
  }
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

useEffect(()=>{
  getSaveAlarms()
  const interval = setInterval(() => {
    checkAlarm()
  }, 30000);
})
setInterval(() => {
  // check nfc
  // readNdef()
}, 1000);
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
            {alarmList()}
            <Modal 
            animationType="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {
              setIsOpen(false);
            }}
            >
          <TouchableWithoutFeedback onPress={()=>{setIsOpen(false)}}>
            <View style={sty.modalOverlay} />
          </TouchableWithoutFeedback>

          <View style={sty.centeredView}>
          <View style={sty.modalView}>
              <Text style={sty.modalText}>Confirm Delete</Text>
            <Pressable
              style={[sty.button, sty.buttonClose]}
              onPress={prompDelete}
            >
              <Text style={sty.textStyle}>Delete</Text>
            </Pressable>
          </View>
        </View>
        </Modal>
        {/* <Pressable onPress={stopSound}>
        <Ionicons name="stop-circle-outline" size={24} color="red" />
        </Pressable> */}
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "red",
  },
  buttonClose: {
    backgroundColor: "red",
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