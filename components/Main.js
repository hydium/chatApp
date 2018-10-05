import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase'; 

class Main extends React.Component {
  render() {
    return (
    	<View>
        <TouchableOpacity onPress = {() => this.props.navigation.navigate('Chat')}>
          <Text style = {styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const offset = 24;
const styles = StyleSheet.create({
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
});

export default Main;