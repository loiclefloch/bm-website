var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');
var Constants = require('../constants/Constants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var Events = require('../utils/Events.js');
var ActionTypes = ApiConstants.ActionTypes;
var Entity = require('../utils/Entity.js');

var _tags = [];
var _errors = [];
var _searchTags = [];

var _search = Entity.SEARCH_TAG;
var _tag = Entity.TAG;
var _paging = Entity.PAGING_TAG;
var _searchPaging = Entity.PAGING_TAG;

/**
 * Stores are like a mix between a model and a controller,
 * they handle the data, the main state of the application,
 * feeding the records to the views, while retrieving the data
 * from the server
 */
var TagStore = assign({}, EventEmitter.prototype, {

  addListener: function (event, callback) {
    this.on(event, callback);
  },

  emitEvent: function (event) {
    this.emit(event);
  },

  getAllTags: function () {
    return _tags;
  },

  getSearchTags: function () {
    return _searchTags;
  },

  clearTag: function () {
    _tag = {}
  },

  getTag: function () {
    return _tag;
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
    if (!_.isEmpty(_searchTags)) {
      _searchPaging = PAGING_OBJECT;
      _searchTags = [];
      _search = SEARCH_DEFAULT;
      this.emitEvent(Events.CHANGE);
    }
  },

});

TagStore.dispatchToken = AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {

    case ActionTypes.RECEIVE_TAGS:
      _tags = _.unionWith(_tags, action.json.tags, function (a, b) {
        return a.id == b.id;
      });
      if (action.json.paging) {
        _paging = action.json.paging;
      }
      TagStore.emitEvent(Events.CHANGE);
      TagStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_SEARCH_TAGS:
      _searchTags = action.json.tags;
      _searchPaging = action.json.paging;
      TagStore.emitEvent(Events.CHANGE);
      TagStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_TAG:
      if (action.json) {
        _tags.unshift(action.json);
        _errors = [];
        TagStore.emitEvent(Events.CREATE);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      TagStore.emitEvent(Events.CHANGE);
      TagStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_REMOVED_TAG:
      if (action.json) {
        _tags = _.remove(_tags, function(n) {
          return n.id == action.json.id;
        });
        _errors = [];
        TagStore.emitEvent(Events.REMOVE);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      TagStore.emitEvent(Events.CHANGE);
      TagStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_TAG_ERROR:
      if (action.json) {
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      TagStore.emitEvent(Events.CHANGE);
      TagStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_TAG:
      if (action.json) {
        _tag = action.json.tag;
        // Attach bookmarks with the tag to the tag to make things easier
        _tag['bookmarks'] = action.json.bookmarks;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      TagStore.emitEvent(Events.CHANGE);
      TagStore.emitEvent(Events.LOADING);
      break;

    case ActionTypes.ERROR_RESPONSE:
      var json = JSON.parse(action.json);
      _errors = [
        json.error
      ];
      TagStore.emitEvent(Events.CHANGE);
      TagStore.emitEvent(Events.LOADING);
      break;

  }

  return true;
});

module.exports = TagStore;