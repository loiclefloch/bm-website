import BMEventEmitter from 'abstracts/BMEventEmitter';

import AppDispatcher from '../dispatcher/AppDispatcher';

// -- vars

let _bookmarks = null;
let _searchBookmarks = null; 
let _errors = null;
let _search = Entity.SEARCH_BOOKMARK;
let _paging = Entity.PAGING_BOOKMARK;
let _searchPaging = Entity.PAGING_BOOKMARK;
let _bookmark = null;

/**
 * Stores are like a mix between a model and a controller,
 * they handle the data, the main state of the application,
 * feeding the records to the views, while retrieving the data
 * from the server
 */
class BookmarkStore extends BMEventEmitter {

  getAllBookmarks() {
    return _bookmarks;
  }

  getSearchBookmarks() {
    return _searchBookmarks;
  }

  clearBookmark() {
    _bookmark = {}
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
    if (!_.isEmpty(_searchBookmarks)) {
      _searchPaging = PAGING_OBJECT;
      _searchBookmarks = [];
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
      _bookmarks = _.unionWith(_bookmarks, action.json.bookmarks, (a, b) => {
        return a.id == b.id;
      });
      _paging = action.json.paging;
      bookmarkStoreInstance.emitEvent(Events.CHANGE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_SEARCH_BOOKMARKS:
      _searchBookmarks = action.json.bookmarks;
      _searchPaging = action.json.paging;
      bookmarkStoreInstance.emitEvent(Events.CHANGE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_BOOKMARK:
      if (action.json) {
        _bookmarks.unshift(action.json);
        _errors = [];
        bookmarkStoreInstance.emitEvent(Events.CREATE);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      bookmarkStoreInstance.emitEvent(Events.CHANGE);
      bookmarkStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_REMOVED_BOOKMARK:
      if (action.json) {
        _bookmarks = _.remove(_bookmarks, function(n) {
          return n.id == action.json.id;
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

    case ActionTypes.RECEIVE_CREATED_BOOKMARK_ERROR:
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
      if (action.json) {
        _bookmark = action.json;
        _errors = [];
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
        _bookmark = action.json;
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
