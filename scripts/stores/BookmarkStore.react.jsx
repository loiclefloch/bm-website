var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');
var Constants = require('../constants/Constants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var Events = require('../utils/Events.js');
var ActionTypes = ApiConstants.ActionTypes;
var Entity = require('../utils/Entity.js');

var _bookmarks = [];
var _searchBookmarks = [];
var _errors = [];

var _search = Entity.SEARCH_DEFAULT;
var _paging = Entity.PAGING;
var _searchPaging = Entity.PAGING;
var _bookmark = Entity.BOOKMARK;

/**
 * Stores are like a mix between a model and a controller,
 * they handle the data, the main state of the application,
 * feeding the records to the views, while retrieving the data
 * from the server
 */
var BookmarkStore = assign({}, EventEmitter.prototype, {

  addListener: function (event, callback) {
    this.on(event, callback);
  },

  emitEvent: function (event) {
    this.emit(event);
  },

  getAllBookmarks: function () {
    return _bookmarks;
  },

  getSearchBookmarks: function () {
    return _searchBookmarks;
  },

  clearBookmark: function () {
    _bookmark = {}
  },

  getBookmark: function () {
    return _bookmark;
  },

  getPaging: function () {
    return _paging;
  },

  getSearchPaging: function () {
    return _searchPaging;
  },

  getErrors: function () {
    return _errors;
  },

  removeErrors: function () {
    _errors = [];
  },

  getSearch: function () {
    return _search;
  },

  clearSearch: function () {
    if (!_.isEmpty(_searchBookmarks)) {
      _searchPaging = PAGING_OBJECT;
      _searchBookmarks = [];
      _search = SEARCH_DEFAULT;
      this.emitEvent(Events.CHANGE);
    }
  },

});

BookmarkStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {

    case ActionTypes.RECEIVE_BOOKMARKS:
      _bookmarks = _.unionWith(_bookmarks, action.json.bookmarks, function (a, b) {
        return a.id == b.id;
      });
      _paging = action.json.paging;
      BookmarkStore.emitEvent(Events.CHANGE);
      BookmarkStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_SEARCH_BOOKMARKS:
      _searchBookmarks = action.json.bookmarks;
      _searchPaging = action.json.paging;
      BookmarkStore.emitEvent(Events.CHANGE);
      BookmarkStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_BOOKMARK:
      if (action.json) {
        _bookmarks.unshift(action.json);
        _errors = [];
        BookmarkStore.emitEvent(Events.CREATE);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      BookmarkStore.emitEvent(Events.CHANGE);
      BookmarkStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_REMOVED_BOOKMARK:
      if (action.json) {
        _bookmarks = _.remove(_bookmarks, function(n) {
          return n.id == action.json.id;
        });
        _errors = [];
        BookmarkStore.emitEvent(Events.REMOVE);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      BookmarkStore.emitEvent(Events.CHANGE);
      BookmarkStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_BOOKMARK_ERROR:
      if (action.json) {
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      BookmarkStore.emitEvent(Events.CHANGE);
      BookmarkStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_BOOKMARK:
      if (action.json) {
        _bookmark = action.json;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      BookmarkStore.emitEvent(Events.CHANGE);
      BookmarkStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.ERROR_RESPONSE:
      var json = JSON.parse(action.json);
      _errors = [
        json.error
      ];
      BookmarkStore.emitEvent(Events.CHANGE);
      BookmarkStore.emitEvent(Events.LOADING);
      break;

  }

  return true;
});

module.exports = BookmarkStore;