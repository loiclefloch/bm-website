import AppDispatcher from '../dispatcher/AppDispatcher';
import ApiConstants from 'constants/ApiConstants';
import Api from 'utils/Api';

import ActionTypes from 'constants/ActionTypes';

export default class BookmarkAction {

  // -- Bookmarks List

  static loadBookmarks(page) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_BOOKMARKS,
      page
    });

    Api.loadBookmarks(page);
  }

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

  // -- Bookmark

  static loadBookmark(bookmarkId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_BOOKMARK,
      bookmarkId: bookmarkId
    });

    Api.loadBookmark(bookmarkId);
  }


  static receiveBookmark(bookmark) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKMARK,
      bookmark
    });
  }


  // -- Create Bookmark

  static createBookmark(name, url, tags, notes) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_BOOKMARK,
      name: name,
      url: url,
      tags: tags,
      notes: notes
    });

    Api.createBookmark(name, url, tags, notes);
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

  // -- Search Bookmarks

  static searchBookmarks(search, page = 0) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOAD_SEARCH_BOOKMARKS,
      search,
      page
    });

    Api.searchBookmarks(search, page);
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

  // -- Delete bookmark

  static deleteBookmark(bookmark) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REMOVE_BOOKMARK,
      bookmark
    });

    Api.searchBookmarks(bookmark);
  }

  static receiveDeletedBookmark(bookmark:Bookmark) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_REMOVED_BOOKMARK,
      bookmark
    });
  }

  static receiveDeletedBookmarkError(error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_REMOVED_BOOKMARK_FAILURE,
      error
      });
  }

  // -- Update

  static deleteTagsForBookmark(tags:Array<Tag>, bookmark:Bookmark) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REMOVE_BOOKMARK_TAGS,
      tags,
      bookmark
    });

    Api.deleteTagsForBookmark(tags, bookmark);
  }

  static receiveUpdateTagsBookmark(bookmark:Bookmark) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKMARK_TAGS,
      bookmark
    });
  }

  static receiveUpdateTagsBookmarkError(error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKMARK_TAGS_FAILURE,
      error
    });
  }


}
