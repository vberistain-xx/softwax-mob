import React from "react-native";
import {
  Image,
  ListView,
  TouchableHighlight,
  Text,
  NavigatorIOS,
  View
} from 'react-native';

import Dimensions from "Dimensions";
import ItemView from "./ItemView";
import Player from "../player/Player";
import ItemStore from "../../stores/ItemStore";
import ItemActions from "../../actions/ItemActions";

const URL_LOCAL = 'http://localhost:3000/items.json';
var _ = require('lodash');

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    _.bindAll(this, 'onChange');
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      items: [],
      itemList: ds.cloneWithRows({})
    };
  }
  componentDidMount() {
    ItemStore.listen(this.onChange);
    ItemActions.getAll();
  }
  componentWillUnmount() {
    ItemStore.unlisten(this.onChange);
  }
  onChange (state) {
    this.setState({
      items: state.items,
      itemList: this.state.itemList.cloneWithRows(state.items)
    });
  }
  onPress(rowData) {
    this.props.navigator.push({
      title: 'Item',
      barTintColor: '#e5c454',
      tintColor: 'black',
      component: ItemView,
      passProps: { data: rowData }
    });
  }
  _renderRow (rowData) {
    return (
      <TouchableHighlight onPress={this.onPress.bind(this, rowData)}>
        <View style={styles.row}>
          <Image source={{uri: rowData.image}} style={styles.thumbnail}></Image>
          <View>
            <Text style={styles.albumTitle}>{rowData.artist.name} - {rowData.title}</Text>
            <Text style={styles.textInfo}>
              {rowData.reference}   {rowData.price}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View style={styles.listContainer}>
        <ListView
          dataSource = {this.state.itemList}
          renderRow = {this._renderRow.bind(this)}>
        </ListView>
        <Player />
      </View>
    );
  }
};

export default ItemList;

var styles = {
  row: {
    height: 70,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#999',
    backgroundColor: '#252525',
  },
  thumbnail: {
    width:68,
    height:68
  },
  textInfo: {
    padding: 5,
    color: '#ebebeb',
  },
  albumTitle: {
    padding: 5,
    color: '#e5c454',
    fontWeight: '500'
  },
  listContainer: {
    height: Dimensions.get('window').height
  }
};