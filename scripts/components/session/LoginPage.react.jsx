var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var Events = require('../../utils/Events.js');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var Loading = require('../common/Loading.react.jsx');
var LoginPage = React.createClass({

  getInitialState: function () {
    return {errors: [], loading: false};
  },

  componentDidMount: function () {
    SessionStore.addListener(Events.CHANGE, this._onChange);
    SessionStore.addListener(Events.LOADING, this._onLoadingEnd);
  },

  componentWillUnmount: function () {
    SessionStore.removeListener(Events.CHANGE, this._onChange);
    SessionStore.removeListener(Events.LOADING, this.displayLoading);
  },

  _onChange: function () {
    this.setState({errors: SessionStore.getErrors()});
  },

  _onSubmit: function (e) {
    e.preventDefault();
    this.displayLoading();
    this.setState({errors: []});
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    SessionActionCreators.login(username, password);
  },

  _onLoadingEnd: function() {
    this.setState({
      loading: false
    });
  },

  displayLoading: function() {
    this.setState({
      loading: true
    });
  },

  render: function () {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var username = SessionStore.getUsername();
    return (
      <div>
        <Loading display={this.state.loading}/>
        {errors}
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

