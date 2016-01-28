var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');
var SessionStore = require('../stores/SessionStore.react.jsx');
var BookmarkStore = require('./BookmarkStore.react.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Router = require('react-router');
var routes = require('../routes.jsx');

var router = Router.create({
  routes: routes,
  location: null // Router.HistoryLocation
});

var ActionTypes = ApiConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var RouteStore = assign({}, EventEmitter.prototype, {
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function() {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getRouter: function() {
    return router;
  },

  redirectHome: function() {
    router.transitionTo('app');
  },

});

RouteStore.dispatchToken = AppDispatcher.register(function(payload) {

  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    BookmarkStore.dispatchToken
  ]);

  var action = payload.action;
  
  switch(action.type) {

    case ActionTypes.REDIRECT:
      router.transitionTo(action.route);
      break;

    case ActionTypes.LOGIN_RESPONSE:
      if (SessionStore.isLoggedIn()) {
        router.transitionTo('app');
      }
      break;

    // Redirect to the list of bookmarks after create a bookmark.
    case ActionTypes.RECEIVE_CREATED_BOOKMARK:
      router.transitionTo('app');
      break;

    case ActionTypes.RECEIVE_REMOVED_BOOKMARK:
      router.transitionTo('bookmarks');
      break;

    default:
  }
  
  return true;
});

module.exports = RouteStore;

