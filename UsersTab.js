import React, { Component } from 'react';
import { View, TextInput, Text, TouchableNativeFeedback, StyleSheet, Alert, FlatList} from 'react-native';
import firebase from 'firebase'; 
// import Fire from './Fire';


class UsersTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      users: [],
    }
  }

  _onLongPressButton() {
    Alert.alert('Some Settings');
  }

  componentWillMount() {
    var tempUsers = [];
    firebase.database().ref("users")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach( (user) => { 
          if (firebase.auth().currentUser.uid != user.child("uid").val()) {
            tempUsers.push({
              name: user.child("firstName").val() + " " + user.child("firstName").val(), 
              uid: user.child("uid").val()
            });
          } 
        });
        this.setState({ users: tempUsers });
      });
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
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
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
  }
});

export default UsersTab;
