var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var SettingsActionCreators = require('../../actions/SettingsActionCreators.react.jsx');
var Loading = require('../common/Loading.react.jsx');
var ServerStore = require('../../stores/ServerStore.react.jsx');
var Events = require('../../utils/Events.js');

var SettingsPage = React.createClass({

    getInitialState: function () {
      return {
        loading: false
      };
    },

    componentDidMount: function () {
      ServerStore.addListener(Events.LOADING, this._onLoadingEnd);
    },

    componentWillUnmount: function () {
      ServerStore.removeListener(Events.LOADING, this._onLoadingEnd);
    },

    displayLoading: function () {
      this.setState({
        loading: true
      });
    },

    _onChange: function () {
    },

    _export: function () {
      this.displayLoading();
      SettingsActionCreators.exportData();
    },

    _onLoadingEnd: function () {
      this.setState({
        loading: false
      });
    },

    render: function () {
      return (
        <div>
          <Loading display={this.state.loading}/>

          <h1 className="text-center">Settings</h1>

          <button className="btn btn-primary" onClick={this._export}>Export data</button>

        </div>
      );
    }
  })
  ;

module.exports = SettingsPage;

