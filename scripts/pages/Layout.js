import React, { PropTypes, Component } from 'react';

import Logger from 'utils/Logger'

import SessionStore from '../stores/SessionStore';
import RouteStore from '../stores/RouteStore';
import Events from 'constants/Events';

import Header from './other/Header';

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
  };
}

/**
 * Component that serves as the root layout.
 */
export default class Layout extends Component {

  /**
   * fired when the component is initialized
   */
  state = getStateFromStores();

  /**
   * called when the SessionStore emits a new change.
   * @private
   */
  onChange = () => {
    this.setState(getStateFromStores());
  }

  renderLayout() {
    return (
      <div className="app">
        <Header
          routes={this.props.routes}
        />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }

  render() {
    /**
     * Render the layout of our page. If an exception occured, we log it and send it to our tracker.
     */
    try {
      return this.renderLayout();
    } catch (exception) {
      Logger.logException(exception);
    }
  }
}
