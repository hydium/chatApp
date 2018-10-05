import React, { Component } from 'react';
import { View, TextInput, Text, TouchableHighlight, StyleSheet, Alert } from 'react-native';
// import firebase from 'firebase';
// import Fire from '../Fire';
import firebase from '@firebase/app'

// var firebase = require('firebase');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '' 
    }
  }
  render() {
    return (
      <View style = {styles.screen}>
    		<TextInput
    			onChangeText = {(email) => this.setState({email: email})}
          style = {styles.input}
          placeholder = "email"
          value = {this.state.email}
        />

        <TextInput
          onChangeText = {(password) => this.setState({password: password})}
          style = {styles.input}
          placeholder = "password"
          value = {this.state.password}
          secureTextEntry = {true}
        />

        <TouchableHighlight underlayColor = "white" style = {styles.buttonPlace} 

        onPress = {() => firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((user) => this.props.navigation.navigate('Messages'))//'Main'))
          .catch((error) => {Alert.alert(error.message)})
        }>

          <View style = {styles.signIn}>
            <Text style = {styles.signInText}>Sign in</Text>
          </View>
        </TouchableHighlight>


        <TouchableHighlight underlayColor = "white" style = {styles.buttonPlace} 
        onPress = {() => this.props.navigation.navigate('SignUp')}>
          <View style = {styles.signUp}>
            <Text style = {styles.signUpText}>Sign up</Text>
          </View>
        </TouchableHighlight>


      </View>

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
    margin: offset * 0.4,
  },
  signUp: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signIn: {
    borderRadius: 8,
    height: offset * 2,
    width: offset * 9,
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
    fontSize: offset * 0.8,
    height: offset * 2,
    width: offset * 9,
    margin: offset * 0.4,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 0,
    borderBottomWidth: 2,
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  signInText: {
    fontSize: offset * 0.8,
    color: white,
  },
  signUpText: {
    fontSize: offset * 0.8,
    color: lightgray,
  },
});

export default Login;