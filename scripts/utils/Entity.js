const Constants from 'constants/Constants';

const Entity = {

  BOOKMARK: {
    name: "",
    url: "",
    tags: [],
    notes: "",
    content: "",
    title: "",
    description: "",
    type: Constants.Bookmark.Type.WEBSITE,
    reading_time: 1, // the estimated time (in seconds) to read the content.
    preview_picture: null
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