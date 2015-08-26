import React from 'react-native';
import Stylish from 'react-native-stylish';
import Components from './App/Components';
import LocationStore from './App/Stores/LocationStore';
import LocationConstants from './App/Constants/LocationConstants'
import SearchResultStore from './App/Stores/SearchResultStore';
import Dispatcher from './App/Dispatcher';

var {
  AppRegistry,
  Component,
  View,
  Text
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

class StylingExample extends Component {
  constructor(props) {
    super(props);
    this.state = getLocationState();
  }

  _onChange() {
    this.setState(getLocationState());
  }

  componentDidMount() {
    LocationStore.addChangeListener(::this._onChange);
    navigator.geolocation.getCurrentPosition( (posn) => {
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
        <ProductSearch style={{flex: 1}}/>
      </View>
    );
  }
}

Stylish.for(StylingExample).base({
  container: {
    flex: 1,
    paddingTop: 20
  }
})

AppRegistry.registerComponent('StylingExample', () => StylingExample);
