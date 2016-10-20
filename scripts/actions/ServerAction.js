import AppDispatcher from '../dispatcher/AppDispatcher';

import ApiConstants from 'constants/ApiConstants';
import ActionTypes from 'constants/ActionTypes';

// -- entities
import Bookmark from 'entities/Bookmark';
import BookmarksList from 'entities/BookmarksList';
import Tag from 'entities/Tag';
import TagsList from 'entities/TagsList';
import ApiError from 'entities/ApiError';

export default class ServerAction {

  static receiveError(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.FAILURE_RESPONSE,
      json,
      errors: null
    });
  }

  static receiveLogin(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json
    });
  }

  static receiveLoginError(apiError:ApiError) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE_FAILURE,
      apiError
    });
  }

  static receiveExport(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_EXPORT_DATA,
      json
    });
  }

  static receiveImport(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_IMPORT_DATA,
      json
    });
  }

}
