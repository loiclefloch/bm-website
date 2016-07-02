import AppDispatcher from 'dispatcher/AppDispatcher';
import ApiConstants from 'constants/ApiConstants';
import WebAPIUtils from 'utils/WebAPIUtils';

const ActionTypes = ApiConstants.ActionTypes;

export default class BookmarkAction {
  
  static loadBookmarks(page) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_BOOKMARKS,
      page
    });
    WebAPIUtils.loadBookmarks(page);
  }

  static loadBookmark(bookmarkId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_BOOKMARK,
      bookmarkId: bookmarkId
    });
    WebAPIUtils.loadBookmark(bookmarkId);
  }

  static createBookmark(name, url, tags, notes) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_BOOKMARK,
      name: name,
      url: url,
      tags: tags,
      notes: notes
    });
    WebAPIUtils.createBookmark(name, url, tags, notes);
  }

  static searchBookmarks(search, page = 0) {

  }

}
