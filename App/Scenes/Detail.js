import React from 'react-native';
import Components from '../Components';

var {
  Label,
  Photo,
} = Components;

var {
  Component,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  MapView
} = React;

class Detail extends Component {
  _handleBackButtonPress() {
    this.props.navigator.pop();
  }

  _annotations() {
    return [{
      latitude: this.props.lat,
      longitude: this.props.lon,
      title: 'You are here'
    }]
  }

  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState() {
    return {
      annotations: []
    }
  }

  render() {
    var item = this.props.item;
    return (
      <View>
        <MapView
          style={{height: 400}}
          annotations={this.state.annotations}
          region={{
            latitude: this.props.lat,
            longitude: this.props.lon,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Photo source={item.image} />
            <View style={{flexDirection: 'column'}}>
              <Label label={item.title} />
              <Label label="Produced by" value={item.producer} />
              <Label label="From" value={item.origin} />
              <Label label={item.price} value={`per ${item.package}`} />
            </View>
          </View>
      </View>
    )
  }
}

module.exports = Detail;
