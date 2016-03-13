module.exports = {

  Bookmark: {
    DEFAULT_LIMIT: 20, // numbers of bookmarks to display on tags page

    Type: {
      WEBSITE: 0, // default
      ARTICLE: 1,
      VIDEO: 2,
      MUSIC: 3,
      CODE: 4, // for example: github code page or project
      GAME: 5,
      SLIDE: 6
    }

  },

  Tag: {
    DEFAULT_LIMIT: 100, // numbers of tags to display on tags page
    DEFAULT_COLOR: "#c3c3c3"
  },

  /**
   * Contains the key used to save items on session storage
   */
  Session: {

    /**
     * The View.BookmarkListType. Define the type of list to display on the bookmark list.
     */
    BOOKMARK_LIST_TYPE: "bm_list_type"
  },

  /**
   * Constants relative to views. (display mode, etc)
   */
  View: {

    /**
     * The different types of display for the bookmarks list
     */
    BookmarkListType: {
      /**
       * Normal block. On bookmark per line.
       */
      NORMAL: 0,

      /**
       * Small block. ~ 3  bookmarks per line on medium screens.
       */
      BLOCK: 1,

      /**
       * Like NORMAL, but with less information.
       */
      COMPACT: 2
    }

  }

};
