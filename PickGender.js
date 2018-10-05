import React, { Component } from 'react';
import { View, TextInput, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Keyboard, Alert} from 'react-native';
import firebase from 'firebase';

class PickGender extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      male: false,
      female: false,
      errorColor: white,
    }
  }

  handleNext = () => {
    if (!this.state.male && !this.state.female) {
      this.setState({errorColor: 'red'});
    }
    else {
      this.setState({errorColor: white});
      const { navigation } = this.props;
      this.props.navigation.navigate('SignUpEmail', { 
        firstName: navigation.getParam('firstName'),
        lastName: navigation.getParam('lastName'),
        gender: this.state.male ? 'male' : 'female',
      });
    }
  }

  render() {
    return (
      <View style = {styles.screen}>
        <Text style = {styles.title} > What's Your Gender? </Text>

        <Text style = {{color: this.state.errorColor, top: - offset * 1.5, fontSize: offset * 0.7}} >
         Please select a gender </Text>

        <View style = {styles.inputs}>
          <View>
            <Text style = {styles.optionText}> Male </Text> 
            <View top = {offset}>
              <Text style = {styles.optionText}> Female </Text>
            </View>
          </View>

          <View>
            <TouchableWithoutFeedback underlayColor = "white"
            onPress = {() => this.setState({ male: true, female: false })}>
              <View style = {styles.outerCircle}>
                <View style = {styles.innerCircle} backgroundColor = { this.state.male ? blue : white }/>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback underlayColor = "white"
            onPress = {() => this.setState({ male: false, female: true })}>
              <View style = {styles.outerCircle} top = {offset}>
                <View style = {styles.innerCircle} backgroundColor = { this.state.female ? blue : white }/>
              </View>
            </TouchableWithoutFeedback>
          </View>
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
    top: offset * 2.5,
  },
  nextView: {
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
    borderWidth: 0,
  },
  inputs: {
    flexDirection: 'row',
  },
  title: {
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
  },
  outerCircle: {
    left: offset * 5,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'gray',
    width: offset * 1.1,
    height: offset * 1.1,
    borderRadius: offset * 1.1 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    // backgroundColor: blue,
    width: offset * 0.6,
    height: offset * 0.6,
    borderRadius: offset * 0.6 / 2,
  },
  optionText: {
    fontSize: offset * 0.85,
    color: '#111111',
    right: offset * 4.5,
  }
});

export default PickGender;