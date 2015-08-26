import React from 'react-native';
import Stylish from 'react-native-stylish';
import Scenes from './App/Scenes';

var {
  AppRegistry,
  Component,
  View,
  Text
} = React;

class StylingExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.NavigatorIOS
        style={this.stylesFor('container')}
        ref="nav"
        initialRoute={{title: 'LCBO Product Search', component: Scenes.Home}}
      />
    );
  }
}

Stylish.for(StylingExample).base({
  container: {
    flex: 1,
  }
})

AppRegistry.registerComponent('StylingExample', () => StylingExample);
