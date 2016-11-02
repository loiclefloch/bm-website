import BMEventEmitter from 'abstracts/BMEventEmitter';
import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import Events from 'constants/Events';
import ActionTypes from 'constants/ActionTypes';

// -- entities
import TagsList from 'entities/TagsList';
import Tag from 'entities/Tag';

// -- vars
let _error = null;
let _tagsList:TagsList = null;
let _tag:Tag = null;

class TagStore extends BMEventEmitter {

  getTagsList():TagsList {
    return _tagsList;
  }

  getTag():Tag {
    return _tag;
  }

  getError() {
    return _error;
  }

  clearError() {
    _error = null;
  }

}

const tagStoreInstance = new TagStore();

tagStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {

    case ActionTypes.RECEIVE_TAGS:
      _tagsList = action.tagsList;

      tagStoreInstance.emitEvent(Events.LOAD_TAGS_SUCCESS);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;


    case ActionTypes.RECEIVE_CREATED_TAG:
      _tagsList.unshift(action.tag);
      tagStoreInstance.clearError();

      tagStoreInstance.emitEvent(Events.CREATED_TAG_SUCCESS);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_REMOVED_TAG:
      _tagsList = _.remove(_tagsList, (n) => {
        return n.id === action.tag.id;
      });

      tagStoreInstance.clearError();
      tagStoreInstance.emitEvent(Events.REMOVE_TAG_SUCCESS);

      tagStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_CREATED_TAG_FAILURE:
      _error = action.error;
      
      tagStoreInstance.emitEvent(Events.CREATED_TAG_ERROR);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;

    case ActionTypes.RECEIVE_TAG:
      _tag = action.tag;

      tagStoreInstance.clearError();

      tagStoreInstance.emitEvent(Events.GET_TAG_SUCCESS);
      tagStoreInstance.emitEvent(Events.LOADING);
      break;

    default:
  }
});

export default tagStoreInstance;
