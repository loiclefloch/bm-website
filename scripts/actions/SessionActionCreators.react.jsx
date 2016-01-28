var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = ApiConstants.ActionTypes;

module.exports = {

  login: function(username, password) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      username: username,
      password: password
    });
    WebAPIUtils.login(username, password);
  },

  logout: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }
  
};

