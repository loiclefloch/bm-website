import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes';

export default class RouteAction {

  static redirect(route) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }

}



