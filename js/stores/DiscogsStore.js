import alt from '../alt';
import DiscogsActions from '../actions/DiscogsActions';

var _discogsToken = 'mpMOUrLplVtGgqhJdoSIgetefOzxRKKjwwkDRHgW';
var _discogsApiRoot = 'https://api.discogs.com/';

class DiscogsStore {
  constructor(){
    this.items = [];
    this.bindListeners({
      getUserCollection: DiscogsActions.GET_USER_COLLECTION
    });
  }

  addStreamItem(item){
    this.items.push(item);
  }

  removeStreamItem(index){
    if (index > -1) {
        this.items.splice(index, 1);
    }
  }

  buildDiscogsSearchApiUrl(method, artist, title) {
    var url = _discogsApiRoot + 'database/%method%?release_title=%title%&artist=%artist%&per_page=5&page=1&token=%token%';
    url = url.replace('%method%', method)
      .replace('%title%', title)
      .replace('%artist%', artist)
      .replace('%token%', _discogsToken);
    return url;
  }

  buildDiscogsUserCollectionApiUrl(username) {
    var url = _discogsApiRoot + 'users/%username%/collection/folders/0/releases?token=%token%';
    url = url.replace('%username%', username)
      .replace('%token%', _discogsToken);
    return url;
  }

  splitArtistTitle(artistTitle) {
    return artistTitle.split(' - ');
  }

  buildItemFromDiscogs(result) {
    let artistTitle = this.splitArtistTitle(result.title);
    let item = {
      artist: artistTitle[0],
      title: artistTitle[1],
      imageUrl: result.thumb
    };
    return item;
  }

  buildItemFromCollection(result){
    let item = {
      artist: {
        'name' : result.artists[0].name
      },
      title: result.title,
      image: result.thumb,
      year: result.year

    };
    return item;
  }

  getDiscogsResults(search) {
    fetch(this.buildDiscogsSearchApiUrl('search', search.title, search.artist))
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.results.length) {
          let item = this.buildItemFromDiscogs(data.results[0]);
          // StreamActions.addStreamItem(item);
        } else {
          console.log('No Results');
        }
      })
      .done()
  }
  getUserCollection(username) {
    fetch(this.buildDiscogsUserCollectionApiUrl(username))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.releases.length) {
          responseData.releases.forEach(function(item){
            this.addStreamItem(this.buildItemFromCollection(item.basic_information));
          }, this);
        } else {
          console.log('No Results');
        }
      })
      .done()
  }
}

module.exports = alt.createStore(DiscogsStore, 'DiscogsStore');
