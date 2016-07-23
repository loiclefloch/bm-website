import _ from 'lodash';

import Events from 'constants/Events';
import BMEventEmitter from 'abstracts/BMEventEmitter';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

import { browserHistory } from 'react-router';
import Route from '../objects/Route';

import ActionTypes from 'constants/ActionTypes';

import RouteAction from '../actions/RouteAction';
import RoutingEnum from 'constants/RoutingEnum';

// -- stores
import SessionStore from 'stores/SessionStore';
import BookmarkStore from 'stores/BookmarkStore';

// -- entities
import Bookmark from 'entities/Bookmark';

class RouteStore extends BMEventEmitter {

  redirectToHome() {
    browserHistory.push('app');
  }

  redirectTo(route:Route, params = null) {
    console.log('redirectTo', route, params);
    if (_.isNull(params) || _.isUndefined(params)) {
      browserHistory.push(route.path);
    } else {
      // replace params. On url definition, params start with ':'
      let path = route.path;
      _.forIn(params, (param, key) => {
        path = path.replace(`:${key}`, param);
      });
      console.log('PATH', path);
      browserHistory.push({ pathname: path });
    }
  }

}

const routeStoreInstance = new RouteStore();

routeStoreInstance.dispatchToken = AppDispatcher.register((payload:Object) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    BookmarkStore.dispatchToken
  ]);

  const action = payload.action;

  switch (action.type) {

    case ActionTypes.REDIRECT:
      routeStoreInstance.redirectTo(action.route);
      break;

    case ActionTypes.LOGIN_RESPONSE:
      if (SessionStore.isLoggedIn()) {
        routeStoreInstance.redirectTo(RoutingEnum.BOOKMARKS_LIST);
      }
      break;

    case ActionTypes.RECEIVE_REMOVED_BOOKMARK:
      routeStoreInstance.redirectTo(RoutingEnum.BOOKMARKS_LIST);
      break;

    default:
  }
});

export default routeStoreInstance;
