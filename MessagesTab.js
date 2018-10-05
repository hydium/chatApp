import React, { Component } from 'react';
import { View, FlatList, TextInput, Text, StyleSheet, TouchableNativeFeedback, Alert } from 'react-native';
import firebase from 'firebase'; 


class MessagesTab extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      users: [],
    }
  }

  // componentWillMount() {
  //   var tempUsers = [];
  //   firebase.database()
  //     .ref("users/" + firebase.auth().currentUser.uid + "/ConversationPointers")
  //     .once("value")
  //     .then((snapshot) => {
  //       snapshot.forEach( (conv) => { tempUsers.push({
  //         name: conv.child("OtherUserName").val(), 
  //         uid: conv.child("OtherUserUID").val()
  //       }); 
  //       });
  //       this.setState({ users: tempUsers });
  //     });
  // }

  componentWillMount() {
    firebase.database()
      .ref("users/" + firebase.auth().currentUser.uid + "/ConversationPointers")
      .on("child_added", (snapshot) => {
        newUser = {
          name: snapshot.child("OtherUserName").val(), 
          uid: snapshot.child("OtherUserUID").val()
        };
        this.setState(previousState => ({
          users: [...previousState.users, newUser]
        }));
      });
  }

  componentWillUnmount() {
    firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/ConversationPointers").off();
  }


  _onLongPressButton() {
    Alert.alert('Some Settings');
  }

  render() {
    return (
      <View style={styles.screen}>
        <FlatList
          data={ this.state.users }
          keyExtractor={ item => item.uid }
          renderItem = {({item}) => 
          <TouchableNativeFeedback 
          onPress= {() => this.props.navigation.navigate('Chat', {
            OtherUserName: item.name,
            OtherUserUID: item.uid,
          }) }
          onLongPress={this._onLongPressButton}
          >
            <View style = {styles.entry}>
              <Text style = {styles.entryText}>{item.name}</Text>
            </View>
          </TouchableNativeFeedback>}

        />
      </View>
    );
  }

}


const white = '#ffffff';
const gray = '#222222';
const lightgray = '#888888';
const offset = 25;

const styles = StyleSheet.create({
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
  },
});

export default MessagesTab;