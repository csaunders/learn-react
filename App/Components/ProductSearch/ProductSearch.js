import React from 'react-native';
import Input from './SearchInput';
import Results from './SearchResults';

var {
  Component,
  View
} = React;

class ProductSearch extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
        <Input />
        <Results />
      </View>
    );
  }
}

module.exports = ProductSearch;
