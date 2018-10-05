import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase'; 
// import Fire from './Fire';

import 'core-js/es6/map';
// import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';



class GeneralChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      messages: [],
      path: "messages"
    } 
  }

  get ref() {
    return firebase.database().ref(this.state.path);
  }

 

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
   return message;
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    };
  };

  append = message => this.ref.push(message);

  

  static navigationOptions = ({ navigation }) => ({ 
  	title: firebase.auth().currentUser.displayName, 
  	headerTitleStyle: {
  		paddingLeft: 40,
  	},
  });
  

   on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => 
    callback(this.parse(snapshot)));

  componentWillMount() {
    this.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
	}

	componentWillUnmount() {
	  this.ref.off();
	}

	get user() {
	  // Return our name and our UID for GiftedChat to parse
	  return {
	    name: firebase.auth().currentUser.displayName,
	    _id: this.uid,
	  };
	}
 
  render() {
		return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => {
          this.send(messages);
          var Key = firebase.database().ref("users").push({name: "test"}).key;
          Alert.alert(Key);
        }}
        user={this.user}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default GeneralChat;