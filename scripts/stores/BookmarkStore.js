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
let _errors = null;
let _search:BookmarkSearch = new BookmarkSearch();
let _paging:Paging = new Paging();
let _searchPaging:Paging = new Paging();
let _bookmark:Bookmark = null;

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

  clearBookmark() {
    _bookmark = null;
  }

  getBookmark() {
    return _bookmark;
  }

  getPaging() {
    return _paging;
  }

  getSearchPaging() {
    return _searchPaging;
  }

  getErrors() {
    return _errors;
  }

  removeErrors() {
    _errors = [];
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
        _bookmarksList.mergeWithBookmarksList(action.bookmarksList.bookmarks);
      }
      _paging = action.bookmarksList.paging;
      _errors = null;

      bookmarkStoreInstance.emitEvent(Events.LOAD_BOOKMARKS_SUCCESS);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_SEARCH_BOOKMARKS:
      _searchBookmarksList = action.bookmarksList.bookmarks;
      _searchPaging = action.bookmarksList.paging;
      _errors = null;

      bookmarkStoreInstance.emitEvent(Events.RECEIVE_BOOKING_SEARCH_SUCCESS);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_BOOKMARK:
      if (_.isNull(_bookmarksList)) {
        _bookmarksList = new BookmarksList();
      }
      _bookmarksList.unshift(action.bookmark);
      _errors = null;

      bookmarkStoreInstance.emitEvent(Events.CREATE);
      bookmarkStoreInstance.emitEvent(Events.CHANGE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_BOOKMARK_FAILURE:
      _errors = action.error;

      bookmarkStoreInstance.emitEvent(Events.RECEIVE_CREATED_BOOKMARK_FAILURE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_BOOKMARK:
      _bookmark = action.bookmark;
      _bookmarksList.update(action.bookmark);
      _errors = [];

      bookmarkStoreInstance.emitEvent(Events.CHANGE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_BOOKMARK_FAILURE:
      _errors = action.error;

      bookmarkStoreInstance.emitEvent(Events.CHANGE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_REMOVED_BOOKMARK:
      if (action.bookmark) {
        _bookmarksList.remove(action.bookmark.id);
        _errors = [];
        bookmarkStoreInstance.emitEvent(Events.REMOVE);
      }
      bookmarkStoreInstance.emitEvent(Events.CHANGE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.ERROR_RESPONSE:
      const json = JSON.parse(action.json);
      _errors = [
        json.error
      ];
      bookmarkStoreInstance.emitEvent(Events.CHANGE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_BOOKMARK_TAGS:
      _bookmark = action.bookmark;
      _bookmarksList.update(action.bookmark);

      _errors = [];

      bookmarkStoreInstance.emitEvent(Events.TAGS_CHANGE_FOR_BOOKMARK);
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
