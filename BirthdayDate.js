import React, { Component } from 'react';
import { View, TextInput, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import firebase from 'firebase'

import DateTimePicker from 'react-native-modal-datetime-picker';

class BirthdayDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isDateTimePickerVisible: true,
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  render() {
    return (
      <DateTimePicker
        isVisible={true}
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateTimePicker}
        mode = {'date'}
      />
    );
  }
}



        

const white = '#ffffff';
const gray = '#222222';
const lightgray = '#888888';
const offset = 25;
const blue = '#0084ff';


const styles = StyleSheet.create({
  buttonPlace: {
    top: 0,
  },
  nextView: {
    top: offset * 0.3,
    borderRadius: 8,
    height: offset * 1.8,
    width: offset * 15,
    margin: offset * 0.4,
    borderColor: gray,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blue,
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: white,
  },
  input: {
    top: -offset * 1.5,
    fontSize: offset * 0.8,
    height: offset * 2,
    width: offset * 7,
    margin: offset * 0.4,
    paddingHorizontal: offset,
    // borderColor: lightgray,
    borderWidth: 0,
    // borderBottomWidth: 2,
  },
  inputs: {
    flexDirection: 'row',
    top: offset,
    // flex: 1,
  },
  text: {
    top: -offset * 2,
    fontSize: offset,
    color: '#111111',
  },
  nextText: {
    fontSize: offset * 0.8,
    color: white,
  },
  errorText: {
    top: - offset * 1.5,
    fontSize: offset * 0.7,
  }
});

export default BirthdayDate;