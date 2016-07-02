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

  /*
   * ==================================================================================================
   *      BOOKMARK
   * ==================================================================================================
   */

  static receiveBookmarksList(bookmarksList:BookmarksList) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKMARKS,
      bookmarksList
    });
  }

  static receiveBookmarksListError(error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKMARKS_FAILURE,
      error
    });
  }

  static receiveSearchBookmarks(bookmarksList:BookmarksList) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SEARCH_BOOKMARKS,
      bookmarksList
    });
  }

  static receiveSearchBookmarksError(error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SEARCH_BOOKMARKS,
      error
    });
  }

  static receiveBookmark(bookmark) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKMARK,
      bookmark
    });
  }

  static receiveCreatedBookmark(bookmark:Bookmark) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_BOOKMARK,
      bookmark
    });
  }

  static receiveCreatedBookmarkError(error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_BOOKMARK_FAILURE,
      error
    });
  }

  static receiveRemovedBookmark(bookmark:Bookmark) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_REMOVED_BOOKMARK,
      bookmark
    });
  }

  static receiveUpdateTagsBookmark(bookmark:Bookmark) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKMARK_TAGS,
      bookmark
    });
  }

  /*
   * ==================================================================================================
   *      TAG
   * ==================================================================================================
   */

  static receiveTags(tag:Tag) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TAGS,
      tag
    });
  }

  static receiveSearchTags(tagsList:TagsList) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SEARCH_TAGS,
      tagsList
    });
  }

  static receiveTag(tag:Tag) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TAG,
      tag
    });
  }

  static receiveCreatedTag(tag:Tag) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_TAG,
      tag
    });
  }

  static receiveCreatedTagError(error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_TAG_FAILURE,
      error
    });
  }

  static receiveRemovedTag(tag:Tag) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_REMOVED_TAG,
      tag
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
