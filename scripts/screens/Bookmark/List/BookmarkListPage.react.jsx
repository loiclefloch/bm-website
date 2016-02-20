var React = require('react');

var WebAPIUtils = require('../../../utils/WebAPIUtils.js');

var BookmarkStore = require('../../../stores/BookmarkStore.react.jsx');
var SessionStore = require('../../../stores/SessionStore.react.jsx');

var Events = require('../../../utils/Events.js');

var BookmarkActionCreators = require('../../../actions/BookmarkActionCreators.react.jsx');
var RouteActionCreators = require('../../../actions/RouteActionCreators.react.jsx');

var BookmarkUtils = require('../../../utils/BookmarkUtils.js');

var Loading = require('../../Common/Loading.react.jsx');
var ErrorNotice = require('../../Common/ErrorNotice.react.jsx');
var LoadMore = require('./components/LoadMore.react.jsx');
var SearchBox = require('./components/SearchBox.react.jsx');
var BookmarksTable = require('./components/BookmarksTable.react.jsx');

var BookmarkListPage = React.createClass({

  getInitialState: function () {
    var bookmarks = BookmarkStore.getAllBookmarks();
    var loading = true;
    // Do not display the loading if we have already load the Page.
    // For example, when we came back to this page from the bookmark page.
    if (!_.isEmpty(bookmarks)) {
      loading = false;
    }
    return {
      bookmarks: bookmarks,
      searchBookmarks: BookmarkStore.getSearchBookmarks(),
      errors: [],
      search: BookmarkStore.getSearch(),
      paging: BookmarkStore.getPaging(),
      searchPaging: BookmarkStore.getSearchPaging(),
      loading: loading
    };
  },

  componentDidMount: function () {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }

    BookmarkStore.addListener(Events.CHANGE, this._onChange);
    BookmarkStore.addListener(Events.LOADING, this._onLoadingEnd);

    if (_.isEmpty(this.state.bookmarks)) { // do not call if we came back on the page
      BookmarkActionCreators.loadBookmarks();
    }

    $.material.init();
  },

  componentWillUnmount: function () {
    BookmarkStore.removeErrors();
    BookmarkStore.removeListener(Events.CHANGE, this._onChange);
    BookmarkStore.removeListener(Events.LOADING, this._onLoadingEnd);
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
    console.log('on change');
    this.setState({
      bookmarks: BookmarkStore.getAllBookmarks(),
      searchBookmarks: BookmarkStore.getSearchBookmarks(),
      search: BookmarkStore.getSearch(),
      errors: [],
      paging: BookmarkStore.getPaging(),
      searchPaging: BookmarkStore.getSearchPaging()
    });
  },

  _onLoadingEnd: function () {
    console.log('hide  loading');
    this.setState({
      loading: false
    });
  },

  displayLoading: function () {
    this.setState({
      loading: true
    });
  },

  render: function () {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;

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
      bookmarkTable = (<BookmarksTable bookmarks={bookmarks}/>);
    }
    else if (_.isEmpty(bookmarks) && this.state.loading == false) {
      bookmarkTable = (<NoBookmark />);
    }

    return (
      <div id="bookmark-list">
        {errors}
        <Loading display={this.state.loading}/>
        {/*
         <Fab />
         */}
        <div className="row">

          <div className="col-sm-12 col-md-9 col-md-offset-2">

            <SearchBox search={this.state.search}
                       onSearchSubmit={this.handleSearchSubmit}
                       onSearchInput={this.handleSearchInput}/>

            <div className="top-buffer-50"></div>

            {bookmarkTable}

          </div>

          <div className="col-sm-12 col-md-9 col-md-offset-2 top-buffer-50">
            {loadMore}
          </div>
        </div>

        <div className="top-buffer-50"></div>

      </div>
    )
      ;
  }
});

module.exports = BookmarkListPage;
