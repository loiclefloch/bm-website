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

  /*
   * ==================================================================================================
   *      BOOKMARK
   * ==================================================================================================
   */
  
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
    var type = ActionTypes.RECEIVE_CREATED_BOOKMARK;
    if (errors != null) {
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

  /*
   * ==================================================================================================
   *      TAG
   * ==================================================================================================
   */

  receiveTags: function (json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TAGS,
      json: json
    });
  },

  receiveSearchTags: function (json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SEARCH_TAGS,
      json: json
    });
  },

  receiveTag: function (json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TAG,
      json: json
    });
  },

  receiveCreatedTag: function (json, errors) {
    var type = ActionTypes.RECEIVE_CREATED_TAG;
    if (errors != null) {
      type = ActionTypes.RECEIVE_CREATED_TAG_ERROR
    }
    AppDispatcher.handleServerAction({
      type: type,
      json: json,
      errors: errors
    });
  },

  receiveRemovedTag: function (json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_REMOVED_TAG,
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
  },

  receiveImport: function (json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_IMPORT_DATA,
      json: json,
      errors: errors
    });
  }

};

