var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');

var ActionTypes = ApiConstants.ActionTypes;

module.exports = {

  receiveError: function (json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ERROR_RESPONSE,
      json: json,
      errors: null
    });
  },

  receiveLogin: function (json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveBookmarks: function (json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKMARKS,
      json: json
    });
  },

  receiveSearchBookmarks: function (json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SEARCH_BOOKMARKS,
      json: json
    });
  },

  receiveBookmark: function (json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKMARK,
      json: json
    });
  },

  receiveCreatedBookmark: function (json, errors) {
    if (errors == null) {
      type = ActionTypes.RECEIVE_CREATED_BOOKMARK;
    }
    else {
      type = ActionTypes.RECEIVE_CREATED_BOOKMARK_ERROR
    }
    AppDispatcher.handleServerAction({
      type: type,
      json: json,
      errors: errors
    });
  },

  receiveRemovedBookmark: function (json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_REMOVED_BOOKMARK,
      json: json,
      errors: errors
    });
  },

  receiveExport: function (json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_EXPORT_DATA,
      json: json,
      errors: errors
    });
  }

};

