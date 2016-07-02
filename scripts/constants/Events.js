import keyMirror from 'keymirror';

const Events = keyMirror({
  CHANGE: null,

  LOADING: null,

  CREATE: null,

  REMOVE: null,

  TAGS_CHANGE_FOR_BOOKMARK: null,

  LOADING_TAGS_CHANGE: null,

  ON_LOADING_TAG: null
});

module.exports = Events;
