var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var RouteActionCreators = require('../actions/RouteActionCreators.react.jsx');

var Events = require('../utils/Events.js');

var ActionTypes = ApiConstants.ActionTypes;

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
var _accessToken = localStorage.getItem('access_token');
var _username = localStorage.getItem('username');
var _errors = [];

var SessionStore = assign({}, EventEmitter.prototype, {

  addListener: function (event, callback) {
    this.on(event, callback);
  },

  emitEvent: function (event) {
    this.emit(event);
  },

  isLoggedIn: function() {
    return _accessToken ? true : false;    
  },

  getAccessToken: function() {
    return _accessToken;
  },

  getUsername: function() {
    return _username;
  },

  getErrors: function() {
    return _errors;
  }

});

SessionStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.LOGIN_RESPONSE:
      if (action.json && action.json.access_token) {
        _accessToken = action.json.access_token;
        // Token will always live in the session, so that the API can grab it with no hassle
        localStorage.setItem('access_token', _accessToken);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      SessionStore.emitEvent(Events.CHANGE);
      SessionStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      _username = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
      SessionStore.emitEvent(Events.CHANGE);
      RouteActionCreators.redirect('login');
      break;

    default:
  }
  
  return true;
});

module.exports = SessionStore;

