import React from 'react-native';
import Stylish from 'react-native-stylish';
import Scenes from './App/Scenes';
import Dispatcher from './App/Dispatcher';
import SearchResultConstants from './App/Constants/SearchResultConstants';

var {
  AppRegistry,
  Component,
  View,
  Text,
  Navigator
} = React;

class StylingExample extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Dispatcher.register((payload) => {
      switch(payload.actionType) {
        case SearchResultConstants.ITEM_SELECTED:
          this.props.navigator.push({id: 'details', item: payload.item});
          break;
      }
    });
  }

  renderScene(route, nav) {
    switch(route.id) {
      case 'details':
        return (<Scenes.Details navigator={nav} item={route.item} />);
        break;
      default:
        return (<Scenes.Home navigator={nav} />);
    }
  }

  render() {
    return (
      <Navigator
        style={this.stylesFor('container')}
        ref={this._setNavigatorRef}
        initialRoute={{ message: 'First Scene'}}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if(route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FromTheRight;
        }}
      />
    );
  }

  componentWillUnmount() {
    this._listeners && this._listeners.forEach(listener => listener.remove());
  }

  _setNavigatorRef(navigator) {
    if (navigator !== this._navigator) {
      this.__navigator = navigator;
    }
  }
}

Stylish.for(StylingExample).base({
  container: {
    flex: 1,
    paddingTop: 20
  }
})

AppRegistry.registerComponent('StylingExample', () => StylingExample);
