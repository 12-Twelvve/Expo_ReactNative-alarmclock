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
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  };
  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  };
  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  };
  getFormattedTime(time){
      this.currentTime = time;
  };

  render() {
    return (
      <View>
        <Stopwatch  start={this.state.stopwatchStart}
          msecs
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime} />
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
      </View>
    );
  }
}
const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};

AppRegistry.registerComponent('RNStopWatch', () => RNStopWatch);
export default RNStopWatch