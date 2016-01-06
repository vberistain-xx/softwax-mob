/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React from 'react-native';
import {
  Text,
  StatusBarIOS,
  View
} from 'react-native';

export default class Toolbar extends React.Component {
  componentDidMount() {
    StatusBarIOS.setStyle('light-content', true);
  }
  render() {
    return (
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>Softwax</Text>
      </View>
    );
  }
};

var styles = {
    toolbar:{
    backgroundColor:'black',
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'row'    //Step 1
  },
  toolbarTitle:{
    color:'#fff',
    fontSize: 20,
    textAlign:'center',
    fontWeight:'bold',
    flex:1                //Step 3
  }
};
