var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');
var Constants = require('../constants/Constants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = ApiConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var PAGING_OBJECT = {
  limit: Constants.Bookmark.DEFAULT_LIMIT,
  page: 1,
  total: 0,
  offset: 0,
  last_page: 0,
  results: 0
};

var SEARCH_DEFAULT = {
  'name': ''
}

var _search = SEARCH_DEFAULT;
var _bookmarks = [];
var _searchBookmarks = [];
var _errors = [];
var _paging = PAGING_OBJECT;
var _searchPaging = PAGING_OBJECT;
var _bookmark = { name: "", url: 0, tags: [], notes: "", content: "" };

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

  getSearchBookmarks: function() {
    return _searchBookmarks;
  },

  getBookmark: function() {
    return _bookmark;
  },

  getPaging: function() {
    return _paging;
  },

  getSearchPaging: function() {
    return _searchPaging;
  },

  getErrors: function() {
    return _errors;
  },

  removeErrors: function() {
    _errors = [];
  },

  getSearch: function() {
    return _search;
  },

  clearSearch: function() {
    if (!_.isEmpty(_searchBookmarks)) {
      _searchPaging = PAGING_OBJECT;
      _searchBookmarks = [];
      _search = SEARCH_DEFAULT;
      this.emitChange();
    }
  },

});

BookmarkStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

      case ActionTypes.RECEIVE_BOOKMARKS:
          console.log(_bookmarks);
          _bookmarks = _.union(_bookmarks, action.json.bookmarks);
          console.log(_bookmarks);
          _paging = action.json.paging;
          BookmarkStore.emitChange();
          break;

      case ActionTypes.RECEIVE_SEARCH_BOOKMARKS:
          _searchBookmarks = action.json.bookmarks;
          _searchPaging = action.json.paging;
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

