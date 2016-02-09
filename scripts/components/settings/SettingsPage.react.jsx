var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');

var SettingsPage = React.createClass({

  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {
  },

  _onChange: function () {
  },

  render: function () {
    return (
      <div>
        <h1 className="text-center">Settings</h1>


      </div>
    );
  }
});

module.exports = SettingsPage;

