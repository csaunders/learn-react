import React from 'react-native';
import Stylish from 'react-native-stylish';
import Components from '../Components';
import LocationStore from '../Stores/LocationStore';
import LocationConstants from '../Constants/LocationConstants'
import SearchResultStore from '../Stores/SearchResultStore';
import SearchResultConstants from '../Constants/SearchResultConstants';
import Dispatcher from '../Dispatcher';
import Detail from './Detail'

var {
  AppRegistry,
  Component,
  View,
  Text,
  Navigator
} = React;

var {
  Field,
  ProductSearch
} = Components;

function getLocationState(){
    return {
      location: LocationStore.location,
      postalCode: LocationStore.postalCode
    };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = getLocationState();
  }

  _onChange() {
    this.setState(getLocationState());
  }

  componentDidMount() {
    Dispatcher.register((payload) => {
      switch(payload.actionType) {
        case SearchResultConstants.ITEM_SELECTED:
          this.props.navigator.push({
            title: payload.item.title,
            component: Detail,
            passProps: {
              item: payload.item,
              lat: this.state.location.latitude,
              lon: this.state.location.longitude
            }});
          break;
      }
    });

    LocationStore.addChangeListener(::this._onChange);
    navigator.geolocation.getCurrentPosition( (posn) => {
      // this.props.navigator.push({title: 'Details', component: Detail});
      Dispatcher.dispatch({
        actionType: LocationConstants.LOCATION_UPDATE,
        latitude: posn.coords.latitude,
        longitude: posn.coords.longitude
      });
    });
  }

  componentWillUnmount() {
    LocationStore.removeListeners()
  }

  render() {
    return (
      <View style={this.stylesFor('container')}>
        <Text>Lat: {this.state.location.latitude}</Text>
        <Text>Lon: {this.state.location.longitude}</Text>
        <Text>Postal Code: {this.state.postalCode}</Text>
        <ProductSearch />
      </View>
    );
  }
}

Stylish.for(Home).base({
  container: {
    marginTop: 70,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1
  }
})

module.exports = Home
