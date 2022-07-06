import React, { Component } from 'react';
import { AppRegistry, StyleSheet,Text,View, TouchableHighlight } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { Ionicons } from '@expo/vector-icons';


class RNStopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      stopwatchReset: false,
      laps:[],
     
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.lapStopwatch = this.lapStopwatch.bind(this);
  };
  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  };
  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  };
  lapStopwatch() {
    // state.push(time)
    this.setState({stopwatchStart: false, stopwatchReset: true});
  };
  getFormattedTime(){
    const d = new Date();
    let time = d.getTime()
    this.currentTime = time;
  };


  render() {
    return (
      <View >
        <Stopwatch  start={this.state.stopwatchStart}
          msecs
          reset={this.state.stopwatchReset}
          laps={true}
          startTime={0}
          // options={{startTime:0, laps:true}}
          getTime={this.getFormattedTime} />
        <View style={styles.centeredIcon}>
          <TouchableHighlight onPress={this.toggleStopwatch}>
                {this.state.stopwatchStart?
                ( <Ionicons name="stop-circle" size={50} color="#F27405" />)
                :
                ( <Ionicons name="play" size={50} color="#F27405" />)
              }
          </TouchableHighlight>
          <TouchableHighlight onPress={this.resetStopwatch}>
                <Ionicons name="reload-circle" size={50} color="#F27405" />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.lapStopWatch}>
            <Ionicons name="timer" size={50} color="#F27405" />
          </TouchableHighlight>
        </View>
        <View>
            {/* laps */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centeredIcon: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 22
  },

});
const Laps =(clock)=>{
  return(
    <View>
      <Text>{ clock }</Text>
    </View>
  )
}
AppRegistry.registerComponent('RNStopWatch', () => RNStopWatch);
export default RNStopWatch