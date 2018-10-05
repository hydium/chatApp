import React, { Component } from 'react';
import { View, TextInput, Text, TouchableHighlight, StyleSheet, Keyboard, Alert } from 'react-native';
import firebase from 'firebase';

class SignUpName extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      firstName: '',
      lastName: '',
      firstNameState: 0, 
      lastNameState: 0,
      errorColor: white,
    }
  }
  

  handleNext = () => {
    if (this.state.firstName == "" && this.state.lastName == "") {
      this.setState({errorColor: 'red', firstNameState: 2, lastNameState: 2});
    } else if (this.state.firstName == "") {
      this.setState({errorColor: 'red', firstNameState: 2});
    } else if (this.state.lastName == "") {
      this.setState({errorColor: 'red', lastNameState: 2});
    } else {
      this.firstNameInput.blur();
      this.lastNameInput.blur();
      this.setState({errorColor: white, firstNameState: 0, lastNameState: 0,});
      this.props.navigation.navigate('PickGender', { 
        firstName: this.state.firstName, 
        lastName: this.state.lastName,
      });
    }
  }

  borderColor = (State) => {
    switch(State) {
      case 0:
        return lightgray;
      case 1:
        return blue;
      case 2:
        return 'red';
    }
  };

  placeholderColor = (State) => {
    switch(State) {
      case 0:
        return lightgray;
      case 1:
        return white;
      case 2:
        return 'red';
    }
  };

  render() {
    return (
      <View style = {styles.screen}>
        <Text style = {styles.text} > What's Your Name? </Text>
        <Text  style = {{color: this.state.errorColor, top: - offset * 1.5, fontSize: offset * 0.7}}> 
        Please enter your first and last name </Text>
        
        <View style = {styles.inputs} >
          <TextInput
            onChangeText = {(firstName) => this.setState({firstName: firstName, 
              firstNameState: 1, 
              lastNameState: 0})}
            style = {styles.input}
            placeholder = "First Name"
            value = {this.state.firstName}
            borderColor = {this.borderColor(this.state.firstNameState)}
            placeholderTextColor = {this.placeholderColor(this.state.firstNameState)}
            borderBottomWidth = {(this.state.firstNameState === 0) ? 1 : 3}
            onFocus = {() => {this.setState({ firstNameState: 1, lastNameState: 0 })}}
            ref = {component => this.firstNameInput = component}
          />
          <TextInput
            onChangeText = {(lastName) => this.setState({
              lastName: lastName,
              lastNameState: 1,
              firstNameState: 0})}
            style = {styles.input}
            placeholder = "Last Name"
            value = {this.state.lastName}
            borderColor = {this.borderColor(this.state.lastNameState)}
            placeholderTextColor = {this.placeholderColor(this.state.lastNameState)}
            borderBottomWidth = {(this.state.lastNameState === 0) ? 1 : 3}
            onFocus = {() => {this.setState({ firstNameState: 0, lastNameState: 1 })}}
            ref = {component => this.lastNameInput = component}
          />
      </View>

      <TouchableHighlight underlayColor = "white" style = {styles.buttonPlace} 
          onPress = {this.handleNext}>  
        <View style = {styles.nextView}>
          <Text style = {styles.nextText}>Next</Text>
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

export default SignUpName;