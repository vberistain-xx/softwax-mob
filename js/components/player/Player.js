import React from 'react-native';
import {Text, View} from 'react-native';
import PlayerStore from "../../stores/PlayerStore";
import PlayerActions from "../../actions/PlayerActions";
import Dimensions from "Dimensions";

var Icon = require('react-native-vector-icons/FontAwesome');

var _ = require('lodash');

class Player extends React.Component {
  constructor(props) {
    super(props);
    _.bindAll(this, 'onChange');
    this.state = {
      playing : PlayerStore.getState()
    }
  }
  componentDidMount() {
    PlayerStore.listen(this.onChange);
  }
  componentWillUnmount() {
    PlayerStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  pauseTrack(){
    PlayerActions.pauseTrack();
  }
  render() {
    return (
      !!this.state.playing ?
      <View style={styles.player}>
        <Text style={styles.playerInfo}>{this.state.playing.name}</Text><Text style={styles.playerArtist}>{this.state.playing.artist}</Text>
        <Icon style={styles.playerIcon} name="pause-circle-o" size={25} color="white" onPress={this.pauseTrack.bind(this)} />
      </View> : null
    );
  }
}

export default Player;

var styles = {
  player : {
    position: 'absolute',
    top: Dimensions.get('window').height - 50,
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#e5c454',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerInfo: {
    paddingLeft: 20,
    fontWeight: '600',
    fontSize: 14,
    color: 'white',
  },
  playerArtist: {
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: '300',
    color: '#ebebeb',
  },
  playerIcon: {
    paddingLeft: 10,
    right: 0
  }
}