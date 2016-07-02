import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
  // Routes
  REDIRECT: null,

  ERROR_RESPONSE: null,

  LOGIN_REQUEST: null,
  LOGIN_RESPONSE: null,
  LOGOUT: null,

  LOAD_BOOKMARKS: null,
  RECEIVE_BOOKMARKS: null,
  RECEIVE_SEARCH_BOOKMARKS: null,

  LOAD_BOOKMARK: null,
  RECEIVE_BOOKMARK: null,
  CREATE_BOOKMARK: null,

  RECEIVE_CREATED_BOOKMARK: null,
  RECEIVE_CREATED_BOOKMARK_ERROR: null,
  RECEIVE_REMOVED_BOOKMARK: null,
  RECEIVE_BOOKMARK_TAGS: null,

  LOAD_TAGS: null,
  RECEIVE_TAGS: null,
  RECEIVE_SEARCH_TAGS: null,

  LOAD_TAG: null,
  RECEIVE_TAG: null,
  CREATE_TAG: null,

  RECEIVE_CREATED_TAG: null,
  RECEIVE_CREATED_TAG_ERROR: null,
  RECEIVE_REMOVED_TAG: null,

  EXPORT_DATA: null,
  RECEIVE_EXPORT_DATA: null,

  IMPORT_DATA: null,
  RECEIVE_IMPORT_DATA: null
});

export default ActionTypes;
