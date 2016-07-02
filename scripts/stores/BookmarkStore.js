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
      _searchPaging = PAGING_OBJECT;
      _searchBookmarksList = [];
      _search = SEARCH_DEFAULT;
      this.emitEvent(Events.CHANGE);
    }
  }

}


const bookmarkStoreInstance = new BookmarkStore();

bookmarkStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {

    case ActionTypes.RECEIVE_BOOKMARKS:
      _bookmarksList = _.unionWith(_bookmarksList, action.bookmarksList.bookmarks, (a, b) => {
        return a.id == b.id;
      });
      _paging = action.bookmarksList.paging;
      bookmarkStoreInstance.emitEvent(Events.CHANGE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_SEARCH_BOOKMARKS:
      _searchBookmarksList = action.bookmarksList.bookmarks;
      _searchPaging = action.bookmarksList.paging;
      bookmarkStoreInstance.emitEvent(Events.CHANGE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_BOOKMARK:
      if (action.json) {
        _bookmarksList.unshift(action.bookmark);
        _errors = [];
        bookmarkStoreInstance.emitEvent(Events.CREATE);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      bookmarkStoreInstance.emitEvent(Events.CHANGE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_BOOKMARK_FAILURE:
      if (action.json) {
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      bookmarkStoreInstance.emitEvent(Events.CHANGE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_BOOKMARK:
      _bookmark = action.bookmark;
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
        _bookmarksList = _.remove(_bookmarksList, function(n) {
          return n.id == action.bookmark.id;
        });
        _errors = [];
        bookmarkStoreInstance.emitEvent(Events.REMOVE);
      }
      if (action.errors) {
        _errors = action.errors;
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
      if (action.json) {
        _bookmark = action.bookmark;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      bookmarkStoreInstance.emitEvent(Events.TAGS_CHANGE_FOR_BOOKMARK);
      bookmarkStoreInstance.emitEvent(Events.LOADING_TAGS_CHANGE);
      break;
  }

});

export default bookmarkStoreInstance;
