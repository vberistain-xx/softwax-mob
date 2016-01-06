import React from 'react-native';
import {
  AppRegistry,
  NavigatorIOS
} from 'react-native';

import Dimensions from "Dimensions";

import ItemList from "./js/components/items/ItemList";
import PlayerStore from "./js/stores/PlayerStore";
import DiscogsStore from "./js/stores/DiscogsStore";
import DiscogsActions from "./js/actions/DiscogsActions";
import ItemStore from "./js/stores/ItemStore";
import ItemActions from "./js/actions/ItemActions";

var _ = require('lodash');

const SideMenu = require('react-native-side-menu');

var styles = {
  container : {
    flex: 1,
    backgroundColor: 'black'
  },
  wrappedViewWithoutPlayer: {
    backgroundColor: '#252525',
    height: Dimensions.get('window').height
  },
  wrappedViewWithPlayer: {
    backgroundColor: '#252525',
    height: Dimensions.get('window').height - 50
  }
};

class ReactTest extends React.Component {
  constructor(props) {
    super(props);
    _.bindAll(this, 'onPlayerChange');
    this.state = {
      playing: PlayerStore.getState()
    }
  }
  componentDidMount() {
    PlayerStore.listen(this.onPlayerChange);
  }
  componentWillUnmount() {
    PlayerStore.unlisten(this.onPlayerChange);
  }
  onPlayerChange(state) {
    this.state.playing = state;
  }
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        ref="nav"
        initialRoute={{
          component: ItemList,
          barTintColor: '#e5c454',
          title: 'Veryapp'
        }}
        itemWrapperStyle={styles.wrappedViewWithoutPlayer}
      />
    );
  }
};

export default ReactTest;

AppRegistry.registerComponent('ReactTest', () => ReactTest);
