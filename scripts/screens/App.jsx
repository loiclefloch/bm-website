var React = require('react');

var RouteHandler = require('react-router').RouteHandler;
var SessionStore = require('../stores/SessionStore.react.jsx');
var RouteStore = require('../stores/RouteStore.react.jsx');
var Events = require('../utils/Events.js');

var Header = require('./Other/Header.react.jsx');

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    username: SessionStore.getUsername()
  };
}

/**
 * Component that serves as the root layout.
 */
var App = React.createClass({

  /**
   * fired when the component is initialized
   */
  getInitialState: function() {
    return getStateFromStores();
  },
  
  componentDidMount: function() {
    SessionStore.addListener(Events.CHANGE, this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeListener(Events.CHANGE, this._onChange);
  },

  /**
   * called when the Sessionstore emits a new change.
   * @private
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    return (
      <div className="app">
        <Header
          state={this.props.state}
          username={this.state.username}
          isLoggedIn={this.state.isLoggedIn} />
        <div className="container">
          <RouteHandler/>
        </div>
      </div>
    );
  }

});

module.exports = App;
