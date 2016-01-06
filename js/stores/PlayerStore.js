import alt from '../alt';
import PlayerActions from '../actions/PlayerActions';

var audio = require('react-native').NativeModules.RNAudioPlayerURL;

class PlayerStore {
  constructor() {
    this.state = false;
    this.bindListeners({
      playTrack: PlayerActions.PLAY_TRACK,
      pauseTrack: PlayerActions.PAUSE_TRACK
    });
  }
  playTrack(track) {
    this.state = track;
    audio.initWithURL(this.state.track_url);
    audio.play();
  }
  pauseTrack() {
    this.state = false;
    audio.pause();
  }
}
module.exports = alt.createStore(PlayerStore, 'PlayerStore');

