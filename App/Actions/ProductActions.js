import LCBO from '../Utilities/LCBO';
import Dispatcher from '../Dispatcher';
import SearchResultConstants from '../Constants/SearchResultConstants';

class ProductActions {
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

  search(query) {
    if(query.length == 0) { _notifyNewSearch(); }
    this._notifySearchStarted(query);
    LCBO.products(query)
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

module.exports = new ProductActions
