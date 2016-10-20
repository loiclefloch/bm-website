import _ from 'lodash';
import BMEventEmitter from 'abstracts/BMEventEmitter';

import AppDispatcher from '../dispatcher/AppDispatcher';

import ActionTypes from 'constants/ActionTypes';
import Events from 'constants/Events';

// -- entities
import Bookmark from 'entities/Bookmark';
import BookmarksList from 'entities/BookmarksList';
import BookmarkSearch from 'entities/search/BookmarkSearch';
import Paging from 'entities/paging/Paging';

// -- vars

let _bookmarksList:BookmarksList = null;
let _searchBookmarksList:BookmarksList = null;
let _error = null;
let _search:BookmarkSearch = new BookmarkSearch();
let _paging:Paging = new Paging();
let _searchPaging:Paging = new Paging();
let _bookmark:Bookmark = null;
let _newBookmark:Bookmark = null;

/**
 * Stores are like a mix between a model and a controller,
 * they handle the data, the main state of the application,
 * feeding the records to the views, while retrieving the data
 * from the server
 */
class BookmarkStore extends BMEventEmitter {

  getAllBookmarksList() {
    return _bookmarksList;
  }

  getSearchBookmarksList() {
    return _searchBookmarksList;
  }

  getBookmark():Bookmark {
    return _bookmark;
  }

  getNewBookmark():Bookmark {
    return _newBookmark;
  }

  getPaging() {
    return _paging;
  }

  getSearchPaging() {
    return _searchPaging;
  }

  getError() {
    return _error;
  }

  clearError() {
    _error = null;
  }

  getSearch() {
    return _search;
  }

  clearSearch() {
    if (!_.isEmpty(_searchBookmarksList)) {
      _searchPaging = new Paging();
      _searchBookmarksList = null;
      _search = new BookmarkSearch();
    }
  }

}

const bookmarkStoreInstance = new BookmarkStore();

bookmarkStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {

    case ActionTypes.RECEIVE_BOOKMARKS:
      if (_.isNull(_bookmarksList)) {
        _bookmarksList = action.bookmarksList;
      } else {
        _bookmarksList.mergeWithBookmarksList(action.bookmarksList);
      }
      _paging = action.bookmarksList.paging;

      bookmarkStoreInstance.clearError();

      bookmarkStoreInstance.emitEvent(Events.LOAD_BOOKMARKS_SUCCESS);
      break;

    case ActionTypes.RECEIVE_SEARCH_BOOKMARKS:
      _searchBookmarksList = action.bookmarksList.bookmarks;
      _searchPaging = action.bookmarksList.paging;
      _error = null;

      bookmarkStoreInstance.emitEvent(Events.RECEIVE_BOOKMARK_SEARCH_SUCCESS);
      break;

    case ActionTypes.RECEIVE_CREATED_BOOKMARK:
      if (_.isNull(_bookmarksList)) {
        _bookmarksList = new BookmarksList();
      }
      _newBookmark = action.bookmark;
      _bookmarksList.unshift(action.bookmark);

      bookmarkStoreInstance.clearError();

      bookmarkStoreInstance.emitEvent(Events.CREATED_BOOKMARK_SUCCESS);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_BOOKMARK_FAILURE:
      _error = action.error;

      bookmarkStoreInstance.emitEvent(Events.RECEIVE_CREATED_BOOKMARK_FAILURE);
      break;

    case ActionTypes.RECEIVE_BOOKMARK:
      _bookmark = action.bookmark;

      if (_.isNull(_bookmarksList)) {
        _bookmarksList = new BookmarksList();
      }
      _bookmarksList.update(action.bookmark);

      bookmarkStoreInstance.clearError();

      bookmarkStoreInstance.emitEvent(Events.GET_BOOKMARK_SUCCESS);
      break;

    case ActionTypes.RECEIVE_BOOKMARK_FAILURE:
      _error = action.error;

      bookmarkStoreInstance.emitEvent(Events.GET_BOOKMARK_ERROR);
      break;

    case ActionTypes.RECEIVE_REMOVED_BOOKMARK:
      _bookmarksList.remove(action.bookmark.id);
      bookmarkStoreInstance.clearError();

      bookmarkStoreInstance.emitEvent(Events.REMOVE_BOOKMARK_SUCCESS);
      break;

    case ActionTypes.RECEIVE_BOOKMARK_TAGS:
      _bookmark = action.bookmark;
      _bookmarksList.update(action.bookmark);

      bookmarkStoreInstance.clearError();

      bookmarkStoreInstance.emitEvent(Events.UPDATE_BOOKMARK_SUCCESS);
      break;

    case ActionTypes.SHOW_BOOKMARK_NOTES_EDITOR:
      bookmarkStoreInstance.emitEvent(Events.ON_SHOW_BOOKMARK_NOTES_EDITOR);
      break;

    case ActionTypes.HIDE_BOOKMARK_NOTES_EDITOR:
      bookmarkStoreInstance.emitEvent(Events.ON_HIDE_BOOKMARK_NOTES_EDITOR);
      break;

    default:
  }
});

export default bookmarkStoreInstance;
