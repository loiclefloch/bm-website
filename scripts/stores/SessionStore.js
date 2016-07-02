import BMEventEmitter from 'abstracts/BMEventEmitter';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ApiConstants from 'constants/ApiConstants';
import { EventEmitter } from 'events';

import SessionUtils from 'utils/SessionUtils';

import Events from 'constants/Events';
import Constants from 'constants/Constants';

const ActionTypes = ApiConstants.ActionTypes;

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
let _user = null;
let _errors = [];

/**
 * Contains the key used to save items on session storage
 */
const SessionItemsKeys = {
  /**
   * The View.BookmarkListType. Define the type of list to display on the bookmark list.
   */
  BOOKMARK_LIST_TYPE: 'BOOKMARK_LIST_TYPE',

  ACCESS_TOKEN: 'ACCESS_TOKEN',

  USER: 'USER'
};

class SessionStore extends BMEventEmitter {

  isLoggedIn():Boolean {
    const authorization = this.getAuthorization();
    return !_.isUndefined(authorization) && !_.isNull(authorization);
  }

  // -- user and session

  getAccessToken() {
    return SessionUtils.getItemFromSession(SessionItemsKeys.ACCESS_TOKEN, null);
  }

  getUser():User {
    if (!_.isNull(_user)) {
      return _user;
    }

    // Try to get on session
    const jsonObject = SessionUtils.getItemFromSession(SessionItemKeys.USER);

    const user:User = new User();
    user.fromJson(jsonObject);

    // TODO: if an error, logout?

    return user;
  }

  getErrors() {
    return _errors;
  }

  saveBookmarkListType(type) {
    SessionUtils.saveItemToSession(SessionItemsKeys.BOOKMARK_LIST_TYPE, type);
  }

}

const sessionStoreInstance = new SessionStore();

sessionStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {

    case ActionTypes.LOGIN_RESPONSE:
      if (action.json && action.json.access_token) {
        _accessToken = action.json.access_token;
        // Token will always live in the session, so that the API can grab it with no hassle
        SessionUtils.saveObjectToSession(SessionItemsKeys.ACCESS_TOKEN, _accessToken);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      sessionStoreInstance.emitEvent(Events.CHANGE);
      sessionStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      _username = null;
      localStorage.removeItem(SessionItemsKeys.ACCESS_TOKEN);
      localStorage.removeItem(SessionItemsKeys.USER);
      sessionStoreInstance.emitEvent(Events.CHANGE);


//      RouteAction.redirect( 'login' );
      break;

    default:
  }

  return true;
});

module.exports = SessionStore;

