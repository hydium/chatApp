import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase'; 
// import Fire from './Fire';

import 'core-js/es6/map';
// import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';

import { createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator } from 'react-navigation';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      messages: [],
      path: "garbage"
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
    const { navigation } = this.props;
    var OtherUserUID = navigation.getParam('OtherUserUID');
    var OtherUserName = navigation.getParam('OtherUserName');
    var path = "";
    var ConvKey = "strange";
    var currentUserRef = firebase.database()
    .ref("users/" + firebase.auth().currentUser.uid)
    .once("value")
    .then((snapshot) => {
      if (snapshot.hasChild("ConversationPointers")) {
        firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/ConversationPointers")
        .orderByChild("OtherUserUID")
        .equalTo(OtherUserUID)
        .once("value")
        .then((snapshot1) => {
          if (snapshot1.hasChildren()) {
            snapshot1.forEach((conv) => {
              path = "Conversations/" + conv.child("ConvKey").val();
              this.setState({path: path});
              this.on(message =>
                this.setState(previousState => ({
                  messages: GiftedChat.append(previousState.messages, message),
                }))
              );
              return true;   
            });

          } else {
            ConvKey = firebase.database().ref("Conversations").push().key;
            path = "Conversations/" + ConvKey;

            this.setState({path: path});

            this.on(message =>
              this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
              }))
            );

            firebase.database()
            .ref("users/" + OtherUserUID + "/ConversationPointers")
            .push({
              OtherUserName: firebase.auth().currentUser.displayName,
              OtherUserUID: firebase.auth().currentUser.uid,
              ConvKey: ConvKey,
            });

            firebase.database()
            .ref("users/" + firebase.auth().currentUser.uid + "/ConversationPointers")
            .push({
              OtherUserName: OtherUserName,
              OtherUserUID: OtherUserUID,
              ConvKey: ConvKey,
            });
          }
        });

      } else {
        ConvKey = firebase.database().ref("Conversations").push().key;
        path = "Conversations/" + ConvKey;

        this.setState({path: path});

        this.on(message =>
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
          }))
        );

        firebase.database()
        .ref("users/" + OtherUserUID + "/ConversationPointers")
        .push({
          OtherUserName: firebase.auth().currentUser.displayName,
          OtherUserUID: firebase.auth().currentUser.uid,
          ConvKey: ConvKey,
        });

        firebase.database()
        .ref("users/" + firebase.auth().currentUser.uid + "/ConversationPointers")
        .push({
          OtherUserName: OtherUserName,
          OtherUserUID: OtherUserUID,
          ConvKey: ConvKey,
        });
      }
    });
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
          // firebase.database().ref("users").push({"test": "test?"});
        }}
        user={this.user}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default Chat;