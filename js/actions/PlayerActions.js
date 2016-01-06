import alt from '../alt';

class PlayerActions {
  playTrack(track) {
    return track;
  }
  pauseTrack() {
    return {};
  }
}

module.exports = alt.createActions(PlayerActions);
