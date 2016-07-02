import BMEventEmitter from 'abstracts/BMEventEmitter';

import AppDispatcher from '../dispatcher/AppDispatcher';

// -- vars
let _tags = null;
let _errors = null;
let _searchTags = null;

let _tag = null;
let _search = Entity.SEARCH_TAG;
let _paging = Entity.PAGING_TAG;
let _searchPaging = Entity.PAGING_TAG;

class TagStore extends BMEventEmitter {

  getAllTags() {
    return _tags;
  }

  getSearchTags() {
    return _searchTags;
  }

  clearTag() {
    _tag = {}
  }

  getTag() {
    return _tag;
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
    if (!_.isEmpty(_searchTags)) {
      _searchPaging = PAGING_OBJECT;
      _searchTags = [];
      _search = SEARCH_DEFAULT;
      this.emitEvent(Events.CHANGE);
    }
  }

}

const tagStoreInstance = new TagStore();

tagStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {

    case ActionTypes.RECEIVE_TAGS:
      _tags = _.unionWith(_tags, action.json.tags, function (a, b) {
        return a.id == b.id;
      });
      if (action.json.paging) {
        _paging = action.json.paging;
      }
      tagStoreInstance.emitEvent(Events.CHANGE);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_SEARCH_TAGS:
      _searchTags = action.json.tags;
      _searchPaging = action.json.paging;
      tagStoreInstance.emitEvent(Events.CHANGE);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_TAG:
      if (action.json) {
        _tags.unshift(action.json);
        _errors = [];
        tagStoreInstance.emitEvent(Events.CREATE);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      tagStoreInstance.emitEvent(Events.CHANGE);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_REMOVED_TAG:
      if (action.json) {
        _tags = _.remove(_tags, function(n) {
          return n.id == action.json.id;
        });
        _errors = [];
        tagStoreInstance.emitEvent(Events.REMOVE);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      tagStoreInstance.emitEvent(Events.CHANGE);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_TAG_ERROR:
      if (action.json) {
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      tagStoreInstance.emitEvent(Events.CHANGE);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_TAG:
      if (action.json) {
        _tag = action.json.tag;
        // Attach bookmarks with the tag to the tag to make things easier
        _tag['bookmarks'] = action.json.bookmarks;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      tagStoreInstance.emitEvent(Events.CHANGE);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.ERROR_RESPONSE:
      const json = JSON.parse(action.json);
      _errors = [
        json.error
      ];
      tagStoreInstance.emitEvent(Events.CHANGE);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;

  }

});

export default TagStore;
