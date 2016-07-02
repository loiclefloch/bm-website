import BMEventEmitter from 'abstracts/BMEventEmitter';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Events from 'constants/Events';
import ActionTypes from 'constants/ActionTypes';

// -- entities
import TagsList from 'entities/TagsList';
import Tag from 'entities/Tag';

// -- vars
let _errors = null;
let _tagsList:TagsList = null;
let _tag:Tag = null;

class TagStore extends BMEventEmitter {

  getTagsList():TagsList {
    return _tagsList;
  }

  clearTag() {
    _tag = null;
  }

  getTag():Tag {
    return _tag;
  }

  getErrors() {
    return _errors;
  }

  removeErrors() {
    _errors = [];
  }

  getSearch():TagSearch {
    return _search;
  }

}

const tagStoreInstance = new TagStore();

tagStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {

    case ActionTypes.RECEIVE_TAGS:
      if (_.isNull(_tagsList)) {
        _tagsList = action.tagsList;
      } else {
        _tagsList = _.unionWith(_tagsList.tags, action.tagsList, (a, b) => {
          return a.id === b.id;
        });
      }

      tagStoreInstance.emitEvent(Events.CHANGE);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;


    case ActionTypes.RECEIVE_CREATED_TAG:
      _tagsList.unshift(action.tag);
      _errors = [];
      tagStoreInstance.emitEvent(Events.CREATE);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_REMOVED_TAG:
      _tagsList = _.remove(_tagsList, function(n) {
        return n.id == action.tag.id;
      });
      _errors = [];
      tagStoreInstance.emitEvent(Events.REMOVE);

      tagStoreInstance.emitEvent(Events.CHANGE);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_TAG_FAILURE:
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
      _tag = action.tag;
      _errors = [];

      tagStoreInstance.emitEvent(Events.ON_LOADING_TAG);
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

export default tagStoreInstance;
