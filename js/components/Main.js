'use strict';
import React from 'react-native';
import { View, Text } from 'react-native';
import Content from "./layout/Content";
import Toolbar from "./layout/Toolbar";

class Main extends React.Component {
  render() {
    return (
      <View>
        <Content />
      </View>
    );
  }
};
export default Main;
