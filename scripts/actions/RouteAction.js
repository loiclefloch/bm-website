import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes';

export default class RouteAction {

  static redirect(route) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route
    });
  }

  /**
   * Alias of redirect
   * @param  {Route} route The route where redirect. See #RoutingEnum
   */
  static redirectTo(route) {
    this.redirect(route);
  }

}
