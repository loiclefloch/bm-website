var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = ApiConstants.ActionTypes;

module.exports = {

  exportData: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.EXPORT_DATA
    });
    WebAPIUtils.exportData();
  }

};

