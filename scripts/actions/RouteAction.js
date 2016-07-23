import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes';

export default class RouteAction {

  static redirect(route, params = {}) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route,
      params
    });
  }

  /**
   * Alias of redirect
   * @param  {Route} route The route where redirect. See #RoutingEnum
   */
  static redirectTo(route, params) {
    this.redirect(route, params);
  }

}
