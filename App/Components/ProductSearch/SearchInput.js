import React from 'react-native';
import Stylish from 'react-native-stylish';
import Dispatcher from '../../Dispatcher';
import LCBO from '../../Utilities/LCBO';
import SearchResultConstants from '../../Constants/SearchResultConstants';

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

  _notifyNewSearch() {
    Dispatcher.dispatch({
      actionType: SearchResultConstants.NEW_SEARCH_ACTION,
      message: 'Enter your query above'
    });
  }

  _notifySearchStarted(query) {
    Dispatcher.dispatch({
      actionType: SearchResultConstants.SEARCH_STARTED,
      message: `Searching for products that match "${query}"`,
      status: "searching"
    })
  }

  _notifyError() {
    Dispatcher.dispatch({
      actionType: SearchResultConstants.NO_RESULTS,
      message: "An Error Occurred",
      status: "error"
    })
  }

  _notifySuccess(products) {
    Dispatcher.dispatch({
      actionType: SearchResultConstants.SEARCH_COMPLETE,
      results: products
    })
  }

  _search() {
    this._notifyNewSearch();
    if(this.state.query.length === 0) { return; }

    this._notifySearchStarted(this.state.query);
    LCBO.products(this.state.query)
    .then((products) => {
      this._notifySuccess(products);
    })
    .catch((error) => {
      console.warn(error);
      this._notifyError();
    })
    .done();
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
