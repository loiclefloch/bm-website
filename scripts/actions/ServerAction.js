import AppDispatcher from '../dispatcher/AppDispatcher';

import ApiConstants from 'constants/ApiConstants';
import ActionTypes from 'constants/ActionTypes';

// -- entities
import Bookmark from 'entities/Bookmark';
import BookmarksList from 'entities/BookmarksList';
import Tag from 'entities/Tag';
import TagsList from 'entities/TagsList';

export default class ServerAction {

  static receiveError(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.FAILURE_RESPONSE,
      json: json,
      errors: null
    });
  }

  static receiveLogin(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json
    });
  }

  static receiveLoginError(error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE_FAILURE,
      error
    });
  }

  static receiveExport(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_EXPORT_DATA,
      json: json
    });
  }

  static receiveImport(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_IMPORT_DATA,
      json: json
    });
  }

}
