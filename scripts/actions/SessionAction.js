import AppDispatcher from '../dispatcher/AppDispatcher';
import ApiConstants from 'constants/ApiConstants';
import WebAPIUtils from '../utils/WebAPIUtils';

const ActionTypes = ApiConstants.ActionTypes;

export default class SessionAction {

  static login(username, password) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      username: username,
      password: password
    });
    WebAPIUtils.login(username, password);
  }

  static logout() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }
  
};

