import { View, Text, StyleSheet,  Pressable, Modal, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { country } from './assests/country';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Moment } from 'moment';
var moment = require('moment-timezone');


export default function HomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [clockZones, setClockZones] = useState([]);
    const [localHour, setLocalHour] = useState("00");
    const [localMinute, setLocalMinute] = useState("00");

    const handleZoneSelect =async(zone)=>{
        console.log(zone.Id)
        setModalVisible(false)
        // const clocksStorage = await AsyncStorage.getItem('clocks')
        // if (clocksStorage != null){
        //   setClockZones(clocksStorage)
        //   setClockZones([...zone])
        // }else{
        // }
        setClockZones([...clockZones, zone.Id])
 
        // await AsyncStorage.setItem('clocks', JSON.stringify(clocksStorage))
    }

    const prompDelete =()=>{
      console.log('deleted')
    }
    const getSaveWorldClock =async()=>{
        const clocksStorage = await AsyncStorage.getItem('clocks')
        if (clocksStorage != null) {
        setClockZones(clocksStorage);
        }
    }

    const list = () => {
        return (
            <FlatList
            data={country}
            renderItem={renderItem}
            keyExtractor={(item) => item.Id}
            extraData={selectedId}
        />
        );
      };
    const Item = ({ item, onPress }) => (
        <TouchableOpacity  onPress={onPress} style={modalStyle.itemBox}>
          <Text style={modalStyle.item}>{item.Id}</Text>
        </TouchableOpacity>
      );
    const renderItem = ({ item }) => {  
        return (
          <Item
            item={item}
            onPress={(e)=>handleZoneSelect(item)}
          />
        );
      };

    const renderWorldClocks = ({ item }) => {  
        // const d = new Date();
        console.log(clockZones)
        const time = moment().tz(item).format("hh:mm")
        console.log(time)
        console.log("zn"+ item)
        // getSaveWorldClock()
        return (
          <Worldclock
            clock={time}
            id={item}
            onLongPress={(e)=>prompDelete(clock)}
          />
        );
      };
    const worldClockList = () => {
        return (
            <FlatList
            data={clockZones}
            renderItem={renderWorldClocks}
            keyExtractor={(item) => item}
        />
        );
      };

    const Worldclock = ({ clock, id, onLongPress }) => (
      <TouchableOpacity  onLongPress={onLongPress}>
        <View style={Styles.worldClock}>
          <View style={Styles.worldClockTime}>
              <Text style={Styles.worldClockText}>{ clock }</Text>
          </View>
          <Text style={Styles.wctext}>
              {id}h
          </Text>
        </View>
      </TouchableOpacity>
    );
    const clearAllData=()=> {
      AsyncStorage.getAllKeys()
          .then(keys => AsyncStorage.multiRemove(keys))
          .then(() => alert('success'));
  }
    useEffect(()=>{
      const interval = setInterval(() => {
        const d =new Date()
        setLocalHour((d.getHours()).toString().padStart(2, "0"))
        setLocalMinute((d.getMinutes()).toString().padStart(2, "0"))
        // worldClockList()
      }, 1000);
      // clearAllData()
    }, [])

    return (
        <View style={Styles.container}>
            <View style={Styles.homecontent}>
            <Pressable
                onPress={()=>setModalVisible(true)}
              >
                <View style={Styles.plus}>
                    <AntDesign name="plus" size={30} color="#F27405" />
                </View>
              </Pressable>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {list()}    
                </View>
                </View>
            </Modal>

                <Text style={Styles.text}>World Clock</Text>
      
                <View style={Styles.worldClock}>
                    <View style={Styles.worldClockTime}>
                        <Text style={Styles.worldClockText}>{ localHour }:{ localMinute }</Text>
                    </View>
                    <Text style={Styles.wctext}>
                        Local Time 
                    </Text>
                </View>
                {worldClockList()}
            </View>

        </View>
    )
}
export const Styles = StyleSheet.create({
    worldClock :{
      marginTop:50,
      width:'100%',
      height:80,
      flexDirection:"row",
      alignContent:'center',
      alignItems:'center',
    },
    worldClockTime:{
      alignItems:'center',
      width :'45%',
      height:'90%',
      padding:3,
    },
    worldClockText:{
      color: "#F27405",
      fontSize: 50,
      fontWeight: "bold",
      fontFamily: "Roboto",
    },
    wctext:{
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "Roboto",      
    },
    container: {
        backgroundColor: "#1A1A1A",
        color: "white",
        height: "100%",
    },
    homecontent: {
        marginRight: 30,
        marginLeft: 30,
    },
    plus: {
        flexDirection: "row-reverse",
        marginTop: 30,

    },
    text: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Roboto"
    },

})


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

  const modalStyle = StyleSheet.create({
    container: {
     flex: 1,
    },
    item: {
      padding: 10,
      fontSize: 23,
      height: 54,
      opacity:0.8,

    },
    itemBox: {
        borderBottomWidth: 0.2,
        borderBottomColor:'gray',
    }
  });
