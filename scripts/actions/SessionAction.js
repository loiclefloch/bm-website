import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes';
import Api from '../utils/Api';


export default class SessionAction {

  static login(username, password) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      username: username,
      password: password
    });
    Api.login(username, password);
  }

  static logout() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }
  
};

