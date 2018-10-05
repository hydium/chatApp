import React, { Component } from 'react';
import { View, TextInput, Text, TouchableHighlight, StyleSheet, Keyboard, Alert} from 'react-native';
import firebase from 'firebase';

class SignUpEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      emailState: 0,
      errorColor: white,
    }
  }

  handleNext = () => {
    firebase.auth().fetchSignInMethodsForEmail(this.state.email)
    .then(() => {
      this.emailInput.blur();
      this.setState({errorColor: white, emailState: 0});
      const { navigation } = this.props;
      this.props.navigation.navigate('SignUpPassword', {
        firstName: navigation.getParam('firstName'),
        lastName: navigation.getParam('lastName'),
        gender: navigation.getParam('gender'),
        email: this.state.email,
      });
    })
    .catch((error) => {
      this.setState({errorColor: 'red', emailState: 2});
    });
  };

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

  componentDidMount() {
    this.emailInput.focus();
  }

  render() {
    return (
      <View style = {styles.screen}>
        <Text style = {styles.text} > Enter Your Email Address </Text>
        <Text  style = {{color: this.state.errorColor, top: - offset * 1.5, fontSize: offset * 0.7}}  > Please enter a valid email address </Text>
          <TextInput
            onChangeText = {(email) => this.setState({email: email, emailState: 1})}
            style = {styles.input}
            value = {this.state.email}
            borderColor = {this.borderColor(this.state.emailState)}
            borderBottomWidth = {(this.state.emailState === 0) ? 1 : 3}
            onFocus = {() => this.setState({emailState: 1})}
            ref = {component => this.emailInput = component}
          />
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
    width: offset * 14.5,
    margin: offset * 0.4,
    paddingHorizontal: offset,
    borderWidth: 0,
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

export default SignUpEmail;