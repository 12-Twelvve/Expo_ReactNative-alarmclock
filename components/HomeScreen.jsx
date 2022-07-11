import { View, Text, StyleSheet,  Pressable, Modal, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, {useState, useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { country } from './assests/country';
import storage from './Storage';
// import { Moment } from 'moment';
var moment = require('moment-timezone');


export default function HomeScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [localHour, setLocalHour] = useState("00");
    const [localMinute, setLocalMinute] = useState("00");
    const [zoneIds, setzoneIds] = useState([])
    const [dindex, setdIndex] = useState('')

    const handleZoneSelect =async(zone)=>{
        setModalVisible(false)
        getSaveZone()
        zoneIds.push(zone.Id)
        var zoneData ={
          zoneIds
        }
        storage.save({
          key:'zones',
          data:zoneData,
          expires:null,
        })
    }
    const prompDelete =(index)=>{
      setIsOpenDelete(true)
      setdIndex(index)
    }
    const getSaveZone =()=>{
        storage.load({
          key: 'zones',
          autoSync: true,
          syncInBackground: true,
        })
        .then(ret => {
          // success
          setzoneIds(ret.zoneIds)
          
        })
        .catch(err => {
          console.warn(err.message);
        });
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
    const renderWorldClocks = ({ item, index }) => {  
        // const d = new Date();
        const time = moment().tz(item).format("hh:mm")
        return (
          <Worldclock
            clock={time}
            id={item}
            onLongPress={(e)=>prompDelete(index)}
          />
        );
      };
    const worldClockList = () => {
        return (
            <FlatList
            data={zoneIds}
            renderItem={renderWorldClocks}
            keyExtractor={(item, index) => item}
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
              {id}
          </Text>
        </View>
      </TouchableOpacity>
    );
    const clearAllData=()=> {
  }
  const deleteWorldZone =()=>{
    setIsOpenDelete(false)
    var tempZones = zoneIds
    var deletedDat = tempZones.splice(dindex, 1)
    var zoneData ={
      zoneIds:tempZones
    }
    storage.save({
      key:'zones',
      data:zoneData,
      expires:null,
    })
    setzoneIds(tempZones)
  }
    useEffect(()=>{
      const interval = setInterval(() => {
        const d =new Date()
        setLocalHour((d.getHours()).toString().padStart(2, "0"))
        setLocalMinute((d.getMinutes()).toString().padStart(2, "0"))
      }, 1000);
      getSaveZone()
    })

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
                 <TouchableWithoutFeedback onPress={()=>{setModalVisible(false)}}>
                  <View style={sty.modalOverlay} />
                 </TouchableWithoutFeedback>

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
                {/* delete modal */}
                <Modal 
                  animationType="slide"
                  transparent={true}
                  visible={isOpenDelete}
                  onRequestClose={() => {
                    setIsOpenDelete(false);
                  }}
                  >
                <TouchableWithoutFeedback onPress={()=>{setIsOpenDelete(false)}}>
                  <View style={sty.modalOverlay} />
                </TouchableWithoutFeedback>

                <View style={sty.centeredView}>
                <View style={sty.modalView}>
                    <Text style={sty.modalText}>Confirm Delete</Text>
                  <Pressable
                    style={[sty.button, sty.buttonClose]}
                    onPress={deleteWorldZone}
                  >
                    <Text style={sty.textStyle}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
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
      justifyContent:'space-between',
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