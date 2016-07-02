import AppDispatcher from '../dispatcher/AppDispatcher';
import ApiConstants from 'constants/ApiConstants';
import WebAPIUtils from '../utils/WebAPIUtils';

const ActionTypes = ApiConstants.ActionTypes;

export default class TagAction {

  static loadTags() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_TAGS
    });
    WebAPIUtils.loadTags();
  }

  static loadTag(tagId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_TAG,
      tagId: tagId
    });
    WebAPIUtils.loadTag(tagId);
  }

  static createTag(name, url, tags, notes) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_TAG,
      name: name,
      url: url,
      tags: tags,
      notes: notes
    });
    WebAPIUtils.createTag(name, url, tags, notes);
  }

}
