import React, { Component } from 'react';
import { View, TextInput, Text, TouchableHighlight, StyleSheet, Alert} from 'react-native';
import firebase from 'firebase'

import Fire from '../Fire';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      // surname: '',
      // phoneNumber: '',
      email: '',
      password: '',
      confirmedPassword: '' 
    }
  }

  handleSignUp = () => {
    if (this.state.password === this.state.confirmedPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          var user = firebase.auth().currentUser;
          user.updateProfile({ displayName: this.state.name })
          .then(() => this.props.navigation.navigate('Main'))
            //'Chat', { name: user.displayName }))
          .catch((error) => {Alert.alert(error.message)})})
        .catch((error) => {Alert.alert(error.message)})
    } else {
      Alert.alert("The password and confirmed password do not match!")
    }
  }

  render() {
    return (
      <View style = {styles.common}>
        <TextInput
          onChangeText = {(name) => this.setState({name: name})}
          style = {styles.input}
          placeholder = "name"
          value = {this.state.name}
        />

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

        <TextInput
          onChangeText = {(confirmedPassword) => this.setState({confirmedPassword: confirmedPassword})}
          style = {styles.input}
          placeholder = "confirm password"
          value = {this.state.confirmedPassword}
          secureTextEntry = {true}
        />

        <TouchableHighlight underlayColor = "white" style = {styles.buttonPlace} 
        // onPress = {() => this.props.navigation.navigate('Chat', { name: this.state.email })}>
        onPress = {this.handleSignUp}>  
          <View style = {styles.signIn}>
            <Text style = {styles.signInText}>Sign up</Text>
          </View>
        </TouchableHighlight>


      </View>

    );
  }
}

// <TextInput
        //   onChangeText = {(surname) => this.setState({name: surname})}
        //   style = {styles.input}
        //   placeholder = "surname"
        //   value = {this.state.surname}
        // />

        // <TextInput
        //   onChangeText = {(phoneNumber) => this.setState({phoneNumber: phoneNumber})}
        //   style = {styles.input}
        //   placeholder = "phone number"
        //   value = {this.state.phoneNumber}
        // />

        

const white = '#ffffff';
const gray = '#222222';
const lightgray = '#888888';
const offset = 25;


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
    width: offset * 11,
    margin: offset * 0.4,
    borderColor: gray,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0084ff',
  },
  common: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: white,
  },
  input: {
    fontSize: offset * 0.8,
    height: offset * 2,
    width: offset * 11,
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

export default SignUp;