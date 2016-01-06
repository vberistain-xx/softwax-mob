import React from 'react-native';
import { View, Text, Image, TouchableHighlight } from 'react-native';

import ItemTracks from "./ItemTracks";
import Player from "../player/Player";

class ItemView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Image source={{uri: this.props.data.image}} style={styles.fullImage}></Image>
          <View style={styles.properties}>
            <Text style={styles.albumTitle}>{this.props.data.artist.name} - {this.props.data.title}</Text>
            <Text style={styles.extraInfo}>{this.props.data.price} &#8364;</Text>
            <Text style={styles.extraInfo}>{this.props.data.genre}</Text>
            <Text style={styles.extraInfo}>{this.props.data.category}</Text>
            <Text style={styles.extraInfo}>{this.props.data.reference}</Text>
          </View>
        </View>
        <ItemTracks tracks={this.props.data.tracks} />
        <Player />
      </View>
    );
  }
}

export default ItemView;

var styles = {
  container : {
    paddingTop: 70,
    flexDirection:'row',
    padding: 10
  },
  fullImage: {
    width:128,
    height:128,
  },
  properties: {
    paddingLeft: 10
  },
  albumTitle: {
    color: '#e5c454',
    fontWeight: '500',
    fontSize: 16
  },
  extraInfo: {
    color: 'white'
  }
};