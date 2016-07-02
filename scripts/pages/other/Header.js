import React, { PropTypes, Component } from 'react';

// -- actions
import SessionAction from '../../actions/SessionAction';

// -- route
import RouteStore from '../../stores/RouteStore';

// -- views
import FontAwesome from 'react-fontawesome';

export default class Header extends Component {

  state = {
    username: PropTypes.string,
    isLoggedIn: PropTypes.bool
  };

  onLogout = (e) => {
    e.preventDefault();
    SessionAction.logout();
  };

  render() {
    const state = this.props.state;
    const currentRoutes = state.routes;
    const currentRoute = currentRoutes[currentRoutes.length - 1].name;

    const nav = this.props.isLoggedIn ? (
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">

          <li className={ currentRoute == 'bookmarks' ? 'active' : '' }>
            <Link to="bookmarks">Bookmarks</Link>
          </li>

          <li className={ currentRoute == 'tag-list' ? 'active' : '' }>
            <Link to="tag-list">Tags</Link>
          </li>

          <li className={ currentRoute == 'new-bookmark' ? 'active' : '' }>
            <Link to="new-bookmark">New bookmark</Link>
          </li>

        </ul>

        <ul className="nav navbar-nav navbar-right">
          <li className={ currentRoute == 'settings' ? 'active' : ''}>
            <Link to="settings">
              <FontAwesome
                className=''
                name='gear'
                //spin
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              />
              &nbsp;
              Settings
            </Link>
          </li>
          <li>
            <a href='#' onClick={this.onLogout}>
              Logout
            </a>
          </li>
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
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <a className="navbar-brand" href="#">Bookmark Manager</a>
          </div>
          {nav}
        </div>

      </nav>
    );

  }

}
