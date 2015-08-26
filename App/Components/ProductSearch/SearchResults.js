import React from 'react-native';
import Stylish from 'react-native-stylish';
import SearchResultStore from '../../Stores/SearchResultStore';
import SearchResultConstants from '../../Constants/SearchResultConstants';
import SearchResultItem from './SearchResultItem';
import Dispatcher from '../../Dispatcher';

var {
  Component,
  ListView,
  View,
  Text,
  StyleSheet
} = React

var resultDataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
});

function getSearchResultState(){
  return {
    results: resultDataSource.cloneWithRows(SearchResultStore.results),
    message: 'Enter your query above',
    dispatchToken: null,
  };
}

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = getSearchResultState();
  }

  _onChange() {
    this.setState(getSearchResultState);
  }

  _setDispatchToken(token) {
    this.setState({dispatchToken: token});
  }

  _handleMessage(payload) {
    switch(payload.actionType) {
      case SearchResultConstants.NO_RESULTS:
      case SearchResultConstants.NEW_SEARCH_ACTION:
      case SearchResultConstants.SEARCH_STARTED:
        this.setState({message: payload.message, status: payload.status});
        break;
      default:
        this.setState({status: null})
    }
  }

  _noResults() {
    return this.state.results.getRowCount() === 0
  }

  _noResultsView() {
    return (
      <View>
        <Text>{this.state.message}</Text>
      </View>
    );
  }

  _renderResult(result) {
    return (
      <SearchResultItem result={result} />
    );
  }

  _resultsView() {
    return (
      <View style={{flex: 1}}>
        <Text>Displaying {this.state.results.getRowCount()} product(s)</Text>
        <ListView
          style={{flex: 1}}
          dataSource={this.state.results}
          renderRow={this._renderResult} />
      </View>
    );
  }

  componentDidMount() {
    this._setDispatchToken(Dispatcher.register(::this._handleMessage));
    SearchResultStore.addChangeListener(::this._onChange);
  }

  componentWillUnmount() {
    Dispatcher.unregister(this.dispatchToken)
    this._setDispatchToken(null)
    SearchResultStore.removeListeners();
  }

  render() {
    if(this._noResults()) {
      return this._noResultsView();
    }
    return this._resultsView();
  }
}
module.exports = SearchResults;
