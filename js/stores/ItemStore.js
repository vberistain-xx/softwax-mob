import alt from '../alt';
import ItemActions from '../actions/ItemActions';

const URL_LOCAL = 'http://localhost:3000/items.json';
const URL = 'http://softwax.herokuapp.com/items.json';

class ItemStore {
  constructor() {
    this.state = {
      items: []
    };
    this.bindListeners({
      getAll: ItemActions.GET_ALL
    });
  }
  getAll() {
    fetch(URL_LOCAL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          items: responseData
        });
      })
      .done();
  }
}
module.exports = alt.createStore(ItemStore, 'ItemStore');

