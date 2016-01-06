import React from 'react-native';
import { Text, View } from 'react-native';

import PlayerActions from "../../actions/PlayerActions";
import PlayerStore from "../../stores/PlayerStore";

var Icon = require('react-native-vector-icons/FontAwesome');

class ItemTracks extends React.Component {

  constructor(props) {
    super(props);
  }
  pressTrack(track) {
    PlayerActions.playTrack(track);
  }
  render() {
    var trackNode = this.props.tracks.map(function(track, i) {
      return (
        <View style={styles.tracksContainer} key={i}>
          <Text style={styles.trackName} onPress={this.pressTrack.bind(this, track)}>{track.name}</Text>
          <Icon style={styles.playerIcon} name="play-circle-o" size={18} color="white" onPress={this.pressTrack.bind(this, track)} />
        </View>
      );
    }, this);
    return (
      <View>
        {trackNode}
      </View>
    );
  }
}

export default ItemTracks;

var styles = {
  tracksContainer : {
    padding:10,
    flexDirection: 'row'
  },
  trackName: {
    color: 'white',
    fontSize: 14
  },
  playerIcon: {
    paddingLeft: 10
  }
}