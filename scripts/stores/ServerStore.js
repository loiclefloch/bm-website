import BMEventEmitter from 'abstracts/BMEventEmitter';

let _errors = [];

/// Populate when error 500. Contains the "res" of an API call.
let _serverError = {};

class ServerStore extends BMEventEmitter {

  getErrors() {
    return _errors;
  }

  getServerError() {
    return _serverError;
  }

  setServerError(json) {
    _serverError = json;
  }

}

const serverStoreInstance = new ServerStore();

serverStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {

    case ActionTypes.RECEIVE_EXPORT_DATA:
      serverStoreInstance.emitEvent(Events.CHANGE);
      serverStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_IMPORT_DATA:
      if (action.errors) {
        _errors = action.errors;
      }

      serverStoreInstance.emitEvent(Events.CHANGE);
      serverStoreInstance.emitEvent(Events.LOADING);
      break;

    default:
      break;
  }

  return true;
});

export default serverStoreInstance;
