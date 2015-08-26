import EventEmitter from 'EventEmitter';
import Dispatcher from '../Dispatcher';
import LocationConstants from '../Constants/LocationConstants'

const CHANGE_EVENT = 'change';

class LocationStore extends EventEmitter {
  constructor() {
    super();
    this.location = {latitude: '???', longitude: '???'};
    this.postalCode = '???';

    Dispatcher.register((payload) => {
      console.log(payload);
      switch (payload.actionType) {
        case LocationConstants.LOCATION_UPDATE:
          this._updateLocation(payload);
          break;
        case LocationConstants.POSTAL_CODE_UPDATE:
          this._updatePostalCode(payload);
          break;
      }
    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.addListener(CHANGE_EVENT, callback);
  }

  removeListeners() {
    this.removeAllListeners();
  }

  _updateLocation(payload) {
    this.location = {
      latitude: payload.latitude,
      longitude: payload.longitude
    }
    this.emitChange();
  }

  _updatePostalCode(payload) {
    this.postalCode = payload.postalCode;
    this.emitChange();
  }
}

module.exports = new LocationStore;
