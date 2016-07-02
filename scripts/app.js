import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';

// -- constants
import Config from 'constants/Config';

// -- utils
import Logger from 'utils/Logger';

// -- entities
import User from 'entities/User';

// -- stores
import SessionStore from 'stores/SessionStore';

// -- router
import { Router, browserHistory } from 'react-router';
import routes from './routes';

/**
 * ---- Logger configuration
 */

Logger.configure();

// set default user context when we load the page
const user:User = SessionStore.getUser();
if (!_.isNull(user)) {
  Logger.setUserContext(Logger.UserRole.USER, user.id);
} else {
  Logger.setUserContext(Logger.UserRole.ANONYMOUS, '');
}

/**
 * ---- Why did you update configuration
 */

import whyDidYouUpdate from 'why-did-you-update';

/**
 * Enable https://github.com/garbles/why-did-you-update tool on development mode.
 */
if (process.env.NODE_ENV !== 'production' && (Config.IS_DEV || Config.IS_PREPROD)) {
//  whyDidYouUpdate(React,  { include: /^pure/, exclude: /^Connect/ });
}


/**
 * ---- Route documentation
 */
const element = document.getElementById('app');
const routerView = (
  <Router
    routes={routes}
    history={browserHistory}
  />
);

ReactDOM.render(
  routerView,
  element
);
