var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var RouteActionCreators = require('../actions/RouteActionCreators.react.jsx');

var Events = require('../utils/Events.js');

var ActionTypes = ApiConstants.ActionTypes;

var _errors = [];

/// Populate when error 500. Contains the "res" of an API call.
var _serverError = {};

var ServerStore = assign({}, EventEmitter.prototype, {

  addListener: function (event, callback) {
    this.on(event, callback);
  },

  emitEvent: function (event) {
    this.emit(event);
  },

  getErrors: function () {
    return _errors;
  },

  getServerError: function () {
    return _serverError;
  },

  setServerError: function (json) {
    _serverError = json;
  }
});

ServerStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {

    case ActionTypes.RECEIVE_EXPORT_DATA:
      ServerStore.emitEvent(Events.CHANGE);
      ServerStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_IMPORT_DATA:
      if (action.errors) {
        _errors = action.errors;
      }

      ServerStore.emitEvent(Events.CHANGE);
      ServerStore.emitEvent(Events.LOADING);
      break;

    default:
      break;
  }

  return true;
});

module.exports = ServerStore;

