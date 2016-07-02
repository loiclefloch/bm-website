var React = require('react');

var WebAPIUtils = require('../../../utils/WebAPIUtils.js');

var BookmarkStore = require('../../../stores/BookmarkStore.react.jsx');
var SessionStore = require('../../../stores/SessionStore.react.jsx');

var Events = require('../../../utils/Events.js');

var BookmarkActionCreators = require('../../../actions/BookmarkActionCreators.react.jsx');
var RouteActionCreators = require('../../../actions/RouteActionCreators.react.jsx');

var Constants  = require('../../../constants/Constants');
var BookmarkUtils = require('../../../utils/BookmarkUtils.js');

var ErrorNotice = require('../../Common/ErrorNotice.react.jsx');
var LoadMore = require('./components/LoadMore.react.jsx');
var SearchBox = require('./components/SearchBox.react.jsx');
var BookmarksTable = require('./components/BookmarksTable.react.jsx');
var BookmarksSidebar = require('./components/BookmarkSidebar.jsx');

var LoadingMixin = require('../../Common/Mixins/LoadingMixin.react.jsx');
var ErrorMixin = require('../../Common/Mixins/ErrorMixin.react.jsx');

var BookmarkListPage = React.createClass({

  mixins: [LoadingMixin, ErrorMixin],

  getInitialState: function () {
    var bookmarks = BookmarkStore.getAllBookmarks();
    return {
      bookmarks: bookmarks,
      searchBookmarks: BookmarkStore.getSearchBookmarks(),
      search: BookmarkStore.getSearch(),
      paging: BookmarkStore.getPaging(),
      searchPaging: BookmarkStore.getSearchPaging(),
      bookmarkListType: SessionStore.getIntItemFromSession(Constants.Session.BOOKMARK_LIST_TYPE, Constants.View.BookmarkListType.SIMPLE)
    };
  },

  componentDidMount: function () {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }

    // Do not display the loading if we have already load the Page.
    // For example, when we came back to this page from the bookmark page.
    if (_.isEmpty(this.state.bookmarks)) {
      this.displayLoading();
    }

    BookmarkStore.addListener(Events.CHANGE, this._onChange);
    BookmarkStore.addListener(Events.LOADING, this.hideLoading);

    // do not call if we came back on the page. We need to call if there is only 1 bookmarks
    // because when we create a new bookmark, we are redirect to this page, but the bookmark list is not loaded
    // if we haven't go here before
    if (_.isEmpty(this.state.bookmarks) || this.state.bookmarks.length == 1) {
      BookmarkActionCreators.loadBookmarks();
    }

  },

  componentWillUnmount: function () {
    BookmarkStore.removeErrors();
    BookmarkStore.removeListener(Events.CHANGE, this._onChange);
    BookmarkStore.removeListener(Events.LOADING, this.hideLoading);
  },

  componentDidUpdate: function () {
    $.material.init();
  },

  handleSearchInput: function (search) {
    this.setState({
      search: search
    });
  },

  handleSearchSubmit: function (search) {
    this.displayLoading();
    WebAPIUtils.searchBookmarks(search);
  },

  handleLoadMore: function () {
    var paging = this.state.paging;
    this.displayLoading();
    WebAPIUtils.loadBookmarks(parseInt(paging.page) + 1);
  },

  handleLoadMoreSearch: function () {
    var paging = this.state.searchPaging;
    this.displayLoading();
    WebAPIUtils.searchBookmarks(this.state.search, parseInt(paging.page) + 1);
  },

  _onChange: function () {
    this.setState({
      bookmarks: BookmarkStore.getAllBookmarks(),
      searchBookmarks: BookmarkStore.getSearchBookmarks(),
      search: BookmarkStore.getSearch(),
      paging: BookmarkStore.getPaging(),
      searchPaging: BookmarkStore.getSearchPaging()
    });
  },

  handleChangeListType: function (newBookmarkListType) {

    this.setState({
      bookmarkListType: newBookmarkListType
    });

    SessionStore.saveItemToSession(Constants.Session.BOOKMARK_LIST_TYPE, newBookmarkListType);
  },

  render: function () {

    var bookmarkTable = (<div className="bookmarks__loading"></div>);
    var loadMore = "";
    var bookmarks = [];

    if (_.isEmpty(this.state.search.name)) {
      bookmarks = this.state.bookmarks;
      loadMore = (<LoadMore paging={this.state.paging} loadMore={this.handleLoadMore}/>);
    }
    else {
      // Use search Page
      if (!_.isEmpty(this.state.searchBookmarks)) {
        bookmarks = this.state.searchBookmarks;
        loadMore = (<LoadMore paging={this.state.searchPaging} loadMore={this.handleLoadMoreSearch}/>);
      }
      else { // wait for api search, manually search on displayed Page.

        this.state.bookmarks.forEach(function (bookmark) {
          var name = BookmarkUtils.getDefaultName(bookmark).toLowerCase();
          var filterText = this.state.search.name.toLowerCase();

          // A simple filter no case sensitive
          if (name.indexOf(filterText) >= 0) {
            bookmarks.push(bookmark);
          }

        }.bind(this));

      }

    }

    if (!_.isEmpty(bookmarks)) {
      bookmarkTable = (<BookmarksTable bookmarks={bookmarks}
                                       bookmarkListType={this.state.bookmarkListType}/>);
    }
    else if (_.isEmpty(bookmarks) && this.state.loading == false) {
      bookmarkTable = (<NoBookmark />);
    }

    return (
      <div id="bookmark-list">
        {this.state.loadingView}
        {this.state.errorView}

        <BookmarksSidebar search={this.state.search}
                          onSearchSubmit={this.handleSearchSubmit}
                          onSearchInput={this.handleSearchInput}
                          bookmarkListType={this.state.bookmarkListType}
                          onChangeListType={this.handleChangeListType}/>

        {/*
         <Fab />
         */}
        <div className="row">

          <div className="col-sm-12 col-md-9 col-md-offset-2">

            {bookmarkTable}

          </div>

          <div className="col-sm-12 col-md-9 col-md-offset-2 top-buffer-50">
            {loadMore}
          </div>
        </div>

        <div className="top-buffer-50"></div>

      </div>
    );
  }
});

module.exports = BookmarkListPage;
