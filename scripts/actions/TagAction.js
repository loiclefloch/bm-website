import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from 'constants/ActionTypes';
import Api from '../utils/Api';

export default class TagAction {

  static loadTags() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_TAGS
    });
    Api.loadTags();
  }

  static loadTag(tagId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_TAG,
      tagId: tagId
    });
    Api.loadTag(tagId);
  }

  static createTag(name, url, tags, notes) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_TAG,
      name: name,
      url: url,
      tags: tags,
      notes: notes
    });
    Api.createTag(name, url, tags, notes);
  }

}
