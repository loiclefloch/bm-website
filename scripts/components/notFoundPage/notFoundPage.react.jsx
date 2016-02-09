var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');

var LoginPage = React.createClass({

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
        <h1 className="text-center">Page Not Found</h1>
      </div>
    );
  }
});

module.exports = LoginPage;

