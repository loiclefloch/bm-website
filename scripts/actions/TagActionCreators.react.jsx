var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = ApiConstants.ActionTypes;

module.exports = {

  loadTags: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_TAGS
    });
    WebAPIUtils.loadTags();
  },

  loadTag: function(tagId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_TAG,
      tagId: tagId
    });
    WebAPIUtils.loadTag(tagId);
  },

  createTag: function(name, url, tags, notes) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_TAG,
      name: name,
      url: url,
      tags: tags,
      notes: notes
    });
    WebAPIUtils.createTag(name, url, tags, notes);
  }

};

