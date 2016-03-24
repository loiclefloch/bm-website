var keyMirror = require('keymirror');

var APIRoot = "http://www.local.bm/app_dev.php";

module.exports = {

  APIEndpoints: {
    LOGIN: APIRoot + "/oauth/v2/token",
    BOOKMARKS: APIRoot + "/api/bookmarks",
    TAGS: APIRoot + "/api/tags",
    SEARCH_BOOKMARKS: APIRoot + "/api/search/bookmarks",
    DATA: APIRoot + "/api/data"
  },

  Auth: {
    client_id: "3_41usi26rwc6cs4gwcooskss8g0ww0kg44coowg0wkoc4cwwkgs",
    client_secret: "3wgrk1sdtny88skgsk00o8cc8o84swos4gckkgc4skw00s84ss",
    grant_type: "password"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
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
  })

};
