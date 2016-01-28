var ApiConstants = require('../constants/ApiConstants.js');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSources = ApiConstants.PayloadSources;

/**
 * The dispatcher is the core of the app
 * it’s the central hub for the messages (actions)
 * Two main methods, one will handle the dispatch of server-initiated action,
 * the other one the view-initiated actions.
 */
var AppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = AppDispatcher;

