import keyMirror from 'keymirror';

const Events = keyMirror({
  LOGIN_SUCCESS: null,

  // -- bookmark
  LOAD_BOOKMARKS_SUCCESS: null,
  LOAD_BOOKMARKS_ERROR: null,

  GET_BOOKMARK_SUCCESS: null,
  GET_BOOKMARK_ERROR: null,

  UPDATE_BOOKMARK_SUCCESS: null,
  UPDATE_BOOKMARK_ERROR: null,

  CREATED_BOOKMARK_SUCCESS: null,
  CREATED_BOOKMARK_ERROR: null,

  REMOVE_BOOKMARK_SUCCESS: null,
  REMOVE_BOOKMARK_ERROR: null,

  RECEIVE_BOOKMARK_SEARCH_SUCCESS: null,

  // -- tag
  LOAD_TAGS_SUCCESS: null,
  LOAD_TAGS_ERROR: null,

  GET_TAG_SUCCESS: null,
  GET_TAG_ERROR: null,

  UPDATE_TAG_SUCCESS: null,
  UPDATE_TAG_ERROR: null,

  CREATED_TAG_SUCCESS: null,
  CREATED_TAG_ERROR: null,

  REMOVE_TAG_SUCCESS: null,
  REMOVE_TAG_ERROR: null,

  // -- other
  LOADING: null,

  // -- settings
  LOAD_SETTINGS_SUCCESS: null,
  LOAD_SETTINGS_ERROR: null,

  UPDATE_SETTINGS_SUCCESS: null,
  UPDATE_SETTINGS_ERROR: null,

  // -- view bookmark
  ON_SHOW_BOOKMARK_NOTES_EDITOR: null,
  ON_HIDE_BOOKMARK_NOTES_EDITOR: null
});

module.exports = Events;
