
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase'
import { createStackNavigator, SwitchNavigator } from 'react-navigation'


import Fire from '../Fire';

class Loading extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.navigation.navigate('Login');
      } else {
        // this.props.navigation.navigate('Chat', { name: user.displayName })//firebase.auth().currentUser.displayName })
        this.props.navigation.navigate('Main');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Loading;