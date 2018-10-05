import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
// import firebase from 'firebase'; 

import 'core-js/es6/map';
// import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';

import ignoreWarnings from 'react-native-ignore-warnings';
ignoreWarnings('Setting a timer');

global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');



// import Login from './components/Login';
// import Chat from './components/Chat';
// import SignUp from './components/SignUp';
// import Loading from './components/Loading';
// import Main from './components/Main';
import Login from './Login';
import Chat from './Chat';
import GeneralChat from './GeneralChat';
import SignUp from './SignUp';
import Loading from './Loading';
import MessagesTab from './MessagesTab';
import UsersTab from './UsersTab';
import ThirdTab from './ThirdTab';
import SignUpName from './SignUpName';
import BirthdayDate from './BirthdayDate';
import PickGender from './PickGender';
import SignUpEmail from './SignUpEmail';
import SignUpPassword from './SignUpPassword';



import { createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator } from 'react-navigation'


const AuthStack = createStackNavigator({ 
	Login: Login, 
	SignUp: SignUpName, 
	PickGender: PickGender, 
	SignUpEmail: SignUpEmail,
	SignUpPassword: SignUpPassword 
});

const MainTabs = createMaterialTopTabNavigator(
	{ 
		Messages: MessagesTab, 
		Users: UsersTab,
		ThirdTab: ThirdTab,
	},
	{
		tabBarOptions: 
		{
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
      style: 
      {
      	backgroundColor:'white',
      },
      indicatorStyle: 
      {
        backgroundColor: 'blue',
      }
    },
	}
);

const AppStack = createStackNavigator({ Main: MainTabs, Chat: Chat, GeneralChat: GeneralChat });




export default createSwitchNavigator(
	{
	  Loading: Loading,
	  Auth: AuthStack,
	  App: AppStack,
	},
	{
		initialRouteName: 'Loading',
	}
);