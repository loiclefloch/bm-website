var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var Events = require('../../utils/Events.js');

var ErrorNotice = require('../Common/ErrorNotice.react.jsx');

var LoadingMixin = require('../../Common/Mixins/LoadingMixin.react.jsx');
var ErrorMixin = require('../../Common/Mixins/ErrorMixin.react.jsx');

var LoginPage = React.createClass({

  mixins: [LoadingMixin, ErrorMixin],

  getInitialState: function () {
    return {
    };
  },

  componentDidMount: function () {
    SessionStore.addListener(Events.CHANGE, this._onChange);
    SessionStore.addListener(Events.LOADING, this.hideLoading);
  },

  componentWillUnmount: function () {
    SessionStore.removeListener(Events.CHANGE, this._onChange);
    SessionStore.removeListener(Events.LOADING, this.hideLoading);
  },

  _onChange: function () {
    this.handleError(SessionStore.getErrors());
  },

  _onSubmit: function (e) {
    e.preventDefault();
    this.displayLoading();
    this.hideError();
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    SessionActionCreators.login(username, password);
  },

  render: function () {
    var username = SessionStore.getUsername();
    return (
      <div>
        {this.state.loadingView}
        {this.state.errorView}
        <div className="row">
          <div className="card card--login small-10 medium-6 large-4 columns small-centered">
            <form onSubmit={this._onSubmit} className="form col-sm-12 col-md-6 col-md-offset-3">
              <div className="card--login__field form-group">
                <label name="username">Username</label>
                <input type="text" value={username} name="username" ref="username" className="form-control"/>
              </div>
              <div className="card--login__field form-group">
                <label name="password">Password</label>
                <input type="password" name="password" ref="password" className="form-control"/>
              </div>
              <div className="text-center">
                <button type="submit" className="card--login__submit btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LoginPage;

