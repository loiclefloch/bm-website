var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ApiConstants = require('../constants/ApiConstants.js');

var ActionTypes = ApiConstants.ActionTypes;

module.exports = {

  redirect: function(route) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }

};


