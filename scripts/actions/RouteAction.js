import AppDispatcher from '../dispatcher/AppDispatcher';
import ApiConstants from 'constants/ApiConstants';

const ActionTypes = ApiConstants.ActionTypes;

export default class RouteAction {

  static redirect(route) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }

}



