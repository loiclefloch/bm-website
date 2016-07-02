import React, { PropTypes, Component } from 'react';

// -- actions
import SessionAction from 'actions/SessionAction';

// -- stores
import SessionStore from 'stores/SessionStore';

// -- constants
import RoutingEnum from 'constants/RoutingEnum';

// -- route
import RouteStore from 'stores/RouteStore';

// -- views
import Link from 'components/Link';
import FontAwesome from 'react-fontawesome';

export default class Header extends Component {

  static propTypes = {

    /**
     * Cf App.js. We give to our Layout the app state, that contains the
     * current route.
     */
    routes: PropTypes.any.isRequired
  };

  onLogout = (e) => {
    e.preventDefault();
    SessionAction.logout();
  };

  renderLoggedInMenu() {
    const currentRoutes = this.props.routes;
    let currentRoute = null;
    if (currentRoutes.length > 0) {
      currentRoute = currentRoutes[currentRoutes.length - 1];
      if (_.isUndefined(currentRoute)) {
        currentRoute = null;
      }
//      console.log('CURRENT ROUTE:', currentRoute, currentRoutes);
    }

    return (
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">

          <li className={ currentRoute == 'bookmarks' ? 'active' : '' }>
            <Link to={RoutingEnum.BOOKMARKS_LIST}>Bookmarks</Link>
          </li>

          <li className={ currentRoute == 'tag-list' ? 'active' : '' }>
            <Link to={RoutingEnum.TAGS_LIST}>Tags</Link>
          </li>

          <li className={ currentRoute == 'new-bookmark' ? 'active' : '' }>
            <Link to={RoutingEnum.NEW_BOOKMARK}>New bookmark</Link>
          </li>

        </ul>

        <ul className="nav navbar-nav navbar-right">
          <li className={ currentRoute == 'settings' ? 'active' : ''}>
            <Link to={RoutingEnum.SETTINGS}>
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
    );
  }

  renderNotLoggedInMenu() {
    return (
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to={RoutingEnum.LOGIN}>Login</Link>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    const nav = SessionStore.isLoggedIn() ? this.renderLoggedInMenu() : this.renderNotLoggedInMenu();

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
            <Link
              to={RoutingEnum.HOME}
              className="navbar-brand">
              Bookmark Manager
            </Link>
          </div>
          {nav}
        </div>

      </nav>
    );

  }

}
