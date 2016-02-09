var Constants = require('../constants/Constants.js');

var Entity = {

  BOOKMARK: {
    name: "",
    url: "",
    tags: [],
    notes: "",
    content: "",
    title: "",
    description: ""
  },
  PAGING: {
    limit: Constants.Bookmark.DEFAULT_LIMIT,
    page: 1,
    total: 0,
    offset: 0,
    last_page: 0,
    results: 0
  },

  SEARCH_DEFAULT: {
    'name': ''
  }

};

module.exports = Entity;