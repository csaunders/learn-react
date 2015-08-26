import React from 'react-native';
import Stylish from 'react-native-stylish';
import ProductActions from '../../Actions/ProductActions';

var {
  Component,
  View,
  TextInput
} = React;

class SearchInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: this.props.defaultQuery,
      timeoutId: null,
    }
  }

  render() {
    return (
      <View style={this.stylesFor('container')}>
        <TextInput
          style={this.stylesFor('input')}
          onChangeText={::this._onQueryChanged}
          value={this.state.query} />
        <View style={this.stylesFor('border')} />
      </View>
    );
  }

  _onQueryChanged(query) {
    clearTimeout(this.state.timeoutId)
    var timeoutId = setTimeout(::this._search, 500);
    this.setState({query: query, timeoutId: timeoutId});
  }

  _search() {
    ProductActions.search(this.state.query);
  }
}

SearchInput.defaultProps = {
  defaultQuery: '',
}

Stylish.for(SearchInput).base({
  container: {
    paddingBottom: 2,
    marginBottom: 20,
  },
  border: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  input: {
    height: 30,
    color: 'black',
    fontFamily: 'Helvetica',
    fontSize: 16
  }
}).states({
  focused: {
    border: {
      borderBottomWidth: 2,
      borderBottomColor: 'fuschia'
    }
  }
})

module.exports = SearchInput;
