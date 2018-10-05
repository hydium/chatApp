import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import firebase from 'firebase'; 


class ThirdTab extends React.Component {
  
  render() {
    return (
      <View style={styles.screen}>
        <TouchableOpacity onPress = {() => this.props.navigation.navigate('GeneralChat', { 
          path: 'messages',
          })}>
          <Text style = {styles.buttonText}>GeneralChat</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress = 
          {() => firebase
          .auth()
          .signOut()
          .then(() => this.props.navigation.navigate('Login'))
          .catch((error) => {Alert.alert(error.message)})
          }>
          <Text style = {styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const white = '#ffffff';
const gray = '#222222';
const lightgray = '#888888';
const offset = 25;

const styles = StyleSheet.create({
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
  entry: {
    flex: 1,
    height: offset * 2.5,
    // borderColor: gray,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryText: {
    fontSize: offset,
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: white,
  }
});

export default ThirdTab;