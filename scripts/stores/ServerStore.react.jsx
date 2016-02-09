var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var RouteActionCreators = require('../actions/RouteActionCreators.react.jsx');

var Events = require('../utils/Events.js');

var ActionTypes = ApiConstants.ActionTypes;

var _errors = [];

var ServerStore = assign({}, EventEmitter.prototype, {

  addListener: function (event, callback) {
    this.on(event, callback);
  },

  emitEvent: function (event) {
    this.emit(event);
  },

  getErrors: function() {
    return _errors;
  }

});

ServerStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_EXPORT_DATA:
      ServerStore.emitEvent(Events.LOADING);
    default:
  }

  return true;
});

module.exports = ServerStore;

