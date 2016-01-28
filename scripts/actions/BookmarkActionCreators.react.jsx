var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = ApiConstants.ActionTypes;

module.exports = {

  loadBookmarks: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_BOOKMARKS
    });
    WebAPIUtils.loadBookmarks();
  },

  loadBookmark: function(bookmarkId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_BOOKMARK,
      bookmarkId: bookmarkId
    });
    WebAPIUtils.loadBookmark(bookmarkId);
  },

  createBookmark: function(name, url, tags, notes) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_BOOKMARK,
      name: name,
      url: url,
      tags: tags,
      notes: notes
    });
    WebAPIUtils.createBookmark(name, url, tags, notes);
  }

};

