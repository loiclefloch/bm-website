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

class RouteStore extends BMEventEmitter {

  redirectToHome() {
    browserHistory.push('app');
  }

  redirectTo(route:Route, params = null) {
    if (_.isNull(params)) {
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

    // Redirect to the bookmark page after create a bookmark.
    case ActionTypes.RECEIVE_CREATED_BOOKMARK:
      const bookmark = action.json;
      RouteAction.redirect(); // TODO: redirect to bookmark;
//      router.transitionTo('bookmark', {'bookmarkId': bookmark.id} );
      break;

    case ActionTypes.RECEIVE_REMOVED_BOOKMARK:
      RouteAction.redirect(); // TODO: redirect to bookmarks;
//      router.transitionTo('bookmarks');
      break;

    default:
  }
});

export default routeStoreInstance;
