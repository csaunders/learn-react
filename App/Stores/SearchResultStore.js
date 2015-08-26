import EventEmitter from 'EventEmitter';
import Dispatcher from '../Dispatcher';
import SearchResultConstants from '../Constants/SearchResultConstants';

const CHANGE_EVENT = 'change';

class SearchResultStore extends EventEmitter {
  constructor() {
    super();
    this.results = [];

    Dispatcher.register((payload) => {
      switch (payload.actionType) {
        case SearchResultConstants.NO_RESULTS:
        case SearchResultConstants.NEW_SEARCH_ACTION:
          this.results = [];
          this.emitChange();
          break;
        case SearchResultConstants.SEARCH_COMPLETE:
          this.results = payload.results;
          this.emitChange();
          break;
      }
    });
  }

  emitChange(payload) {
    this.emit(CHANGE_EVENT, payload);
  }

  addChangeListener(callback) {
    this.addListener(CHANGE_EVENT, callback);
  }

  removeListeners() {
    this.removeAllListeners();
  }
}

module.exports = new SearchResultStore;
