import React, { Component } from 'react';
import { View, TextInput, Text, TouchableHighlight, StyleSheet, Keyboard, Alert} from 'react-native';
import firebase from 'firebase';

class SignUpPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      password: '',
      passwordState: 0,
      errorColor: white,
    }
  }



  handleNext = () => { 
    const { navigation } = this.props;
    var firstName = navigation.getParam('firstName');
    var lastName = navigation.getParam('lastName');
    var email = navigation.getParam('email')
    firebase.auth().createUserWithEmailAndPassword(email, this.state.password)
    .then((user) => {
      this.passwordInput.blur();
      var user = firebase.auth().currentUser;
      user.updateProfile({ displayName: firstName + " " + lastName })
      .then(() => {
        firebase.database()
          .ref('users/' + user.uid)
          .set({
            uid: user.uid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: navigation.getParam('gender'),
          });
        this.props.navigation.navigate('Messages');
      }).catch((error) => {Alert.alert(error.message)})})
    .catch((error) => {
      switch(error.code) {  
        case 'auth/email-already-in-use':
          firebase.auth().signInWithEmailAndPassword(email, this.state.password)
          .then(() => this.props.navigation.navigate('Messages'))
          .catch((error1) => (Alert.alert(error1)));
          break;
        default:
          this.setState({errorColor: 'red', passwordState: 2});
      }
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
    this.passwordInput.focus();
  }

  render() {
    return (
      <View style = {styles.screen}>
        <Text style = {styles.text} > Choose a Password </Text>
        
        <Text style = {{
          color: this.state.errorColor, 
          top: - offset * 1.5, 
          fontSize: offset * 0.7,
          textAlign: 'center' }} > 
        Your password must have at least 6 letters,  </Text>

        <Text style = {{
          color: this.state.errorColor, 
          top: - offset * 1.5, 
          fontSize: offset * 0.7,
          textAlign: 'center' }} > 
         numbers and symbols (like ! and %) </Text>
          
          <TextInput
            onChangeText = {(password) => this.setState({password: password, passwordState: 1})}
            style = {styles.input}
            value = {this.state.password}
            borderColor = {this.borderColor(this.state.passwordState)}
            borderBottomWidth = {(this.state.passwordState === 0) ? 1 : 3}
            onFocus = {() => this.setState({passwordState: 1})}
            ref = {component => this.passwordInput = component}
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

export default SignUpPassword;