import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase'; 
import Fire from '../Fire';

import 'core-js/es6/map';
// import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';



class Chat extends React.Component {
  // static navigationOptions = ({ navigation }) => ({ 
  // 	title: (navigation.state.params || {}).name || 'Chat!', 
  // 	headerTitleStyle: {
  // 		paddingLeft: 40,
  // 	},
  // });
  
  state = {
    messages: [],
  };

  componentWillMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
	}

	componentWillUnmount() {
	  Fire.shared.off();
	}

	get user() {
	  // Return our name and our UID for GiftedChat to parse
	  return {
	    name: firebase.auth().currentUser.displayName,
	    _id: Fire.shared.uid,
	  };
	}
 
  render() {
		return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default Chat;