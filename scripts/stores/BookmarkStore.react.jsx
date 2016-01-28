var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = ApiConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _bookmarks = [];
var _errors = [];
var _bookmark = { name: "", url: 0, tags: [], notes: "" };

/**
 * Stores are like a mix between a model and a controller,
 * they handle the data, the main state of the application,
 * feeding the records to the views, while retrieving the data
 * from the server
 */
var BookmarkStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllBookmarks: function() {
    return _bookmarks;
  },

  getBookmark: function() {
    return _bookmark;
  },

  getErrors: function() {
    return _errors;
  },

  removeErrors: function() {
    _errors = [];
  }

});

BookmarkStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    
    case ActionTypes.RECEIVE_BOOKMARKS:
      _bookmarks = action.json;
      BookmarkStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_BOOKMARK:
      if (action.json) {
        _bookmarks.unshift(action.json.bookmark);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      BookmarkStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_BOOKMARK_ERROR:
      if (action.json) {
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      BookmarkStore.emitChange();
      break;

    case ActionTypes.RECEIVE_BOOKMARK:
      if (action.json) {
        _bookmark = action.json;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      BookmarkStore.emitChange();
      break;

    case ActionTypes.ERROR_RESPONSE:
      var json = JSON.parse(action.json);
      _errors = [
        json.error
      ];
      BookmarkStore.emitChange();
      break;

  }

  return true;
});

module.exports = BookmarkStore;

