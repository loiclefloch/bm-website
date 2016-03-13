var Constants = require('../constants/Constants.js');

var Entity = {

  BOOKMARK: {
    name: "",
    url: "",
    tags: [],
    notes: "",
    content: "",
    title: "",
    description: "",
    type: Constants.Bookmark.Type.WEBSITE
  },

  PAGING_BOOKMARK: {
    limit: Constants.Bookmark.DEFAULT_LIMIT,
    page: 1,
    total: 0,
    offset: 0,
    last_page: 0,
    results: 0
  },

  PAGING_TAG: {
    limit: Constants.Tag.DEFAULT_LIMIT,
    page: 1,
    total: 0,
    offset: 0,
    last_page: 0,
    results: 0
  },

  SEARCH_BOOKMARK: {
    'name': ''
  },

  SEARCH_TAG: {
    'name': ''
  },

  TAG: {
    name: "",
    color: Constants.Tag.DEFAULT_COLOR,
    bookmarks: []
  }

};

module.exports = Entity;