import keyMirror from 'keymirror';

const Events = keyMirror({
  CHANGE: null, // TODO: remove

  LOGIN_SUCCESS: null,

  LOAD_BOOKMARKS_SUCCESS: null,

  RECEIVE_BOOKING_SEARCH_SUCCESS: null,

  LOADING: null,

  CREATE: null,

  REMOVE: null,

  TAGS_CHANGE_FOR_BOOKMARK: null,

  LOADING_TAGS_CHANGE: null,

  ON_LOADING_TAG: null,

  // -- view bookmark
  ON_SHOW_BOOKMARK_NOTES_EDITOR: null,
  ON_HIDE_BOOKMARK_NOTES_EDITOR: null
});

module.exports = Events;
