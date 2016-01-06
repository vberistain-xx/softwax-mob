'use strict';
import React from 'react-native';
import {
  View
} from 'react-native';

import ItemList from "../items/ItemList";

export default class Content extends React.Component {
  render() {
    return (
      <ItemList />
    );
  }
}

