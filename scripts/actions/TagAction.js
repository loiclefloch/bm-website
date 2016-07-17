import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes';
import Api from '../utils/Api';

import Tag from 'entities/Tag';

export default class TagAction {

  // -- Tags List

  static loadTags() {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOAD_TAGS
    });
    Api.loadTags();
  }

  static receiveTags(tagsList:TagsList) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TAGS,
      tagsList
    });
  }

  // -- search

  static receiveSearchTags(tagsList:TagsList) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SEARCH_TAGS,
      tagsList
    });
  }

  static receiveSearchTagsError(error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SEARCH_TAGS_FAILURE,
      error
    });
  }


  // -- Tag

  static loadTag(tagId) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOAD_TAG,
      tagId
    });
    Api.loadTag(tagId);
  }

  static receiveTag(tag:Tag) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TAG,
      tag
    });
  }

  static receiveTagError(error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TAG_FAILURE,
      error
    });
  }

  // -- Create

  static createTag(name, url, tags, notes) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CREATE_TAG,
      name,
      url,
      tags,
      notes
    });
    Api.createTag(name, url, tags, notes);
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

  // -- Delete

  static deleteTag(tag:Tag) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CREATE_TAG,
      tag
    });
    Api.deleteTag(tag.id);
  }

  static receiveRemovedTag(tag:Tag) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_REMOVED_TAG,
      tag
    });
  }

}
