import React, { PropTypes, Component } from 'react';

import SessionStore from '../stores/SessionStore';
import RouteStore from '../stores/RouteStore';
import Events from 'constants/Events';

import Header from './other/Header';

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    username: SessionStore.getUsername()
  };
}

/**
 * Component that serves as the root layout.
 */
export default class App extends Component {

  /**
   * fired when the component is initialized
   */
  state = getStateFromStores();


  componentDidMount() {
    SessionStore.addListener(Events.CHANGE, this._onChange);
  }

  componentWillUnmount() {
    SessionStore.removeListener(Events.CHANGE, this._onChange);
  }

  /**
   * called when the SessionStore emits a new change.
   * @private
   */
  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    return (
      <div className="app">
        <Header
          state={this.props.state}
          username={this.state.username}
          isLoggedIn={this.state.isLoggedIn} />
        <div className="container">
          <RouteHandler />
        </div>
      </div>
    );
  }

}
