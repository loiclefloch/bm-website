var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');
var RouteStore = require('../stores/RouteStore.react.jsx');

var Header = React.createClass({

  getInitialState: function () {
    return {
      username: ReactPropTypes.string,
      isLoggedIn: ReactPropTypes.bool
    }
  },

  logout: function (e) {
    e.preventDefault();
    SessionActionCreators.logout();
  },
  render: function () {

    var state = this.props.state;
    var currentRoutes = state.routes;
    var currentRoute = currentRoutes[currentRoutes.length - 1].name;

    var nav = this.props.isLoggedIn ? (
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li className={ currentRoute == 'bookmarks' ? 'active' : '' }>
            <Link to="bookmarks">Bookmarks</Link>
          </li>
          <li className={ currentRoute == 'new-bookmark' ? 'active' : '' }>
            <Link to="new-bookmark">New bookmark</Link>
          </li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">Settings</a></li>
          <li><a href='#' onClick={this.logout}>Logout</a></li>
        </ul>
      </div>
    ) : (
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="login">Login</Link>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-default">

        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Bookmark Manager</a>
          </div>
          {nav}
        </div>

      </nav>
    );

  }
});

module.exports = Header;

