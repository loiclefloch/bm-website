import BMEventEmitter from 'abstracts/BMEventEmitter';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ApiConstants from 'constants/ApiConstants';
import { EventEmitter } from 'events';

import SessionUtils from 'utils/SessionUtils';

import RouteStore from 'stores/RouteStore';
import RoutingEnum from 'constants/RoutingEnum';
import Events from 'constants/Events';
import Constants from 'constants/Constants';
import ActionTypes from 'constants/ActionTypes';

// -- entities
import User from 'entities/User';

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
let _user = null;
let _errors = [];
let _accessToken = null;

/**
 * Contains the key used to save items on session storage
 */
const SessionItemsKeys = {
  /**
   * The View.BookmarkListType. Define the type of list to display on the bookmark list.
   */
  BOOKMARK_LIST_TYPE: 'BOOKMARK_LIST_TYPE',

  ACCESS_TOKEN: 'ACCESS_TOKEN',

  USER: 'USER',

  USERNAME: 'USERNAME'
};

class SessionStore extends BMEventEmitter {

  isLoggedIn():Boolean {
    const authorization = this.getAccessToken();
    console.log('isLoggedIn', authorization);
    return !_.isUndefined(authorization) && !_.isEmpty(authorization);
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
    const jsonObject = SessionUtils.getItemFromSession(SessionItemsKeys.USER);

    const user:User = new User();
    user.fromJson(jsonObject);

    // TODO: if an error, logout?

    return user;
  }

  getErrors() {
    return _errors;
  }

  saveBookmarkListType(type:Number) {
    SessionUtils.saveItemToSession(SessionItemsKeys.BOOKMARK_LIST_TYPE, type);
  }

  getBookmarkListType() {
    return SessionUtils.getIntItemFromSession(SessionItemsKeys.BOOKMARK_LIST_TYPE);
  }

  saveUsername(username:String) {
    SessionUtils.saveItemToSession(SessionItemsKeys.USERNAME, username);
  }

  logout() {
    SessionUtils.saveItemToSession(SessionItemsKeys.ACCESS_TOKEN, null);
    RouteStore.redirectTo(RoutingEnum.LOGIN);
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
      sessionStoreInstance.emitEvent(Events.LOGIN_SUCCESS);
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

export default sessionStoreInstance;
