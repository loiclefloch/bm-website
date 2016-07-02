import AppDispatcher from '../dispatcher/AppDispatcher';
import ApiConstants from 'constants/ApiConstants';

const ActionTypes = ApiConstants.ActionTypes;

export default class ServerAction {

  static receiveError(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ERROR_RESPONSE,
      json: json,
      errors: null
    });
  }

  static receiveLogin(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  }

  /*
   * ==================================================================================================
   *      BOOKMARK
   * ==================================================================================================
   */

  static receiveBookmarks(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKMARKS,
      json: json
    });
  }

  static receiveSearchBookmarks(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SEARCH_BOOKMARKS,
      json: json
    });
  }

  static receiveBookmark(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKMARK,
      json: json
    });
  }

  static receiveCreatedBookmark(json, errors) {
    const type = ActionTypes.RECEIVE_CREATED_BOOKMARK;
    if (errors != null) {
      type = ActionTypes.RECEIVE_CREATED_BOOKMARK_ERROR
    }
    AppDispatcher.handleServerAction({
      type: type,
      json: json,
      errors: errors
    });
  }

  static receiveRemovedBookmark(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_REMOVED_BOOKMARK,
      json: json,
      errors: errors
    });
  }

  static receiveUpdateTagsBookmark(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKMARK_TAGS,
      json: json,
      errors: errors
    });
  }

  /*
   * ==================================================================================================
   *      TAG
   * ==================================================================================================
   */

  static receiveTags(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TAGS,
      json: json
    });
  }

  static receiveSearchTags(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SEARCH_TAGS,
      json: json
    });
  }

  static receiveTag(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TAG,
      json: json
    });
  }

  static receiveCreatedTag(json, errors) {
    const type = ActionTypes.RECEIVE_CREATED_TAG;
    if (errors != null) {
      type = ActionTypes.RECEIVE_CREATED_TAG_ERROR
    }
    AppDispatcher.handleServerAction({
      type: type,
      json: json,
      errors: errors
    });
  }

  static receiveRemovedTag(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_REMOVED_TAG,
      json: json,
      errors: errors
    });
  }

  static receiveExport(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_EXPORT_DATA,
      json: json,
      errors: errors
    });
  }

  static receiveImport(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_IMPORT_DATA,
      json: json,
      errors: errors
    });
  }

}
