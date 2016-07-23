import React from 'react';
import _ from 'lodash';

// -- stores
import BookmarkStore from 'stores/BookmarkStore';
import SessionStore from 'stores/SessionStore';
import TagStore from 'stores/TagStore';

// -- actions
import BookmarkAction from 'actions/BookmarkAction';
import RouteAction from 'actions/RouteAction';
import TagAction from 'actions/TagAction';

// -- constants
import Events from 'constants/Events';
import RoutingEnum from 'constants/RoutingEnum';

// -- utils
import ViewUtils from 'utils/ViewUtils';

// -- entities
import BookmarkSearch from 'entities/search/BookmarkSearch';
import Bookmark from 'entities/Bookmark';

// -- views
import AbstractComponent from 'abstracts/AbstractComponent';
import LoadMore from './components/LoadMore';
// import SearchBox from './components/SearchBox';
import BookmarksTable from './../../../components/bookmark/BookmarksTable';
import BookmarksSidebar from './components/BookmarkSidebar';
import NoBookmarks from 'components/bookmark/NoBookmarks';

export default class BookmarkListPage extends AbstractComponent {

  state = {
    bookmarksList: BookmarkStore.getAllBookmarksList(),
    searchBookmarks: BookmarkStore.getSearchBookmarksList(),
    search: BookmarkStore.getSearch(),
    paging: BookmarkStore.getPaging(),
    searchPaging: BookmarkStore.getSearchPaging(),
    bookmarkListType: SessionStore.getBookmarkListType(),

    tagsList: null
  };

  componentDidMount() {
    if (!SessionStore.isLoggedIn()) {
      RouteAction.redirect(RoutingEnum.LOGIN);
    }

    BookmarkStore.addListener(Events.LOAD_BOOKMARKS_SUCCESS, this.onChange);
    BookmarkStore.addListener(Events.RECEIVE_BOOKMARK_SEARCH_SUCCESS, this.onChange);
    BookmarkStore.addListener(Events.UPDATE_BOOKMARK_SUCCESS, this.onChange);
    BookmarkStore.addListener(Events.LOADING, this.hideLoading);

    TagStore.addListener(Events.LOAD_TAGS_SUCCESS, this.handleLoadTagsSuccess);

    // do not call if we came back on the page. We need to call if there is only 1 bookmarks
    // because when we create a new bookmark, we are redirect to this page,
    // but the bookmark list is not loaded if we haven't went there before
    if (_.isNull(this.state.bookmarksList) || this.state.bookmarksList.bookmarks.length <= 1) {
      this.showLoading();
      BookmarkAction.loadBookmarks();
    }

    TagAction.loadTags();
  }

  componentWillUnmount() {
    BookmarkStore.removeListener(Events.LOAD_BOOKMARKS_SUCCESS, this.onChange);
    BookmarkStore.removeListener(Events.RECEIVE_BOOKMARK_SEARCH_SUCCESS, this.onChange);
    BookmarkStore.removeListener(Events.LOADING, this.hideLoading);
    BookmarkStore.removeListener(Events.UPDATE_BOOKMARK_SUCCESS, this.onChange);

    TagStore.removeListener(Events.LOAD_TAGS_SUCCESS, this.handleLoadTagsSuccess);
  }

  componentDidUpdate() {
    $.material.init();
  }

  handleLoadTagsSuccess = () => {
    this.setState({
      tagsList: TagStore.getTagsList()
    });
  };

  onChange = () => {
    this.setState({
      bookmarksList: BookmarkStore.getAllBookmarksList(),
      searchBookmarks: BookmarkStore.getSearchBookmarksList(),
      search: BookmarkStore.getSearch(),
      paging: BookmarkStore.getPaging(),
      searchPaging: BookmarkStore.getSearchPaging()
    });
  };

  onSearchChange = (search:BookmarkSearch) => {
    this.setState({
      search
    });
  };

  onSearchSubmit = (search:BookmarkSearch) => {
    this.showLoading();
    BookmarkAction.searchBookmarks(search);
  };

  onLoadMore = () => {
    const paging = this.state.paging;
    this.showLoading();
    BookmarkAction.loadBookmarks(parseInt(paging.page, 10) + 1);
  };

  onLoadMoreSearch = () => {
    const paging = this.state.searchPaging;
    this.showLoading();
    BookmarkAction.searchBookmarks(this.state.search, parseInt(paging.page, 10) + 1);
  };

  onListTypeChange = (newBookmarkListType:Number) => {
    this.setState({
      bookmarkListType: newBookmarkListType
    });

    SessionStore.saveBookmarkListType(newBookmarkListType);
  };

  renderBody() {
    let bookmarkTable = (null);
    let loadMoreView = (null);
    let bookmarks = [];

    if (_.isNull(this.state.bookmarksList) || _.isNull(this.state.tagsList)) {
      return this.renderOnLoadingContent();
    }

    if (_.isEmpty(this.state.search.name)) {
      bookmarks = this.state.bookmarksList.bookmarks;
      loadMoreView = (
        <LoadMore
          paging={this.state.paging}
          onLoadMore={this.onLoadMore}
        />
      );
    } else {
      // Use search Page
      if (!_.isEmpty(this.state.searchBookmarks)) {
        bookmarks = this.state.searchBookmarks.bookmarks;
        loadMoreView = (
          <LoadMore
            paging={this.state.searchPaging}
            onLoadMore={this.onLoadMoreSearch}
          />
        );
      } else { // wait for api search, manually search on displayed Page.
        _.each(this.state.bookmarksList.bookmarks, (bookmark:Bookmark) => {
          const name = bookmark.getDefaultName();
          const filterText = this.state.search.name;

          // A simple filter no case sensitive
          if (ViewUtils.searchStringOn(filterText, name)
           || ViewUtils.searchStringOn(filterText, bookmark.content)) {
            bookmarks.push(bookmark);
          }
        });
      }
    }

    if (!_.isEmpty(bookmarks)) {
      bookmarkTable = (
        <BookmarksTable
          bookmarks={bookmarks}
          bookmarkListType={this.state.bookmarkListType}
        />
      );
    } else if (_.isEmpty(bookmarks) && this.state.loading === false) {
      bookmarkTable = (<NoBookmarks />);
    }

    return (
      <div>
        <BookmarksSidebar
          search={this.state.search}
          onSearchSubmit={this.onSearchSubmit}
          onSearchInput={this.onSearchChange}
          bookmarkListType={this.state.bookmarkListType}
          onChangeListType={this.onListTypeChange}
        />

        {/*
          <Fab />
        */}
        <div className="row">

          <div className="col-sm-12 col-md-9 col-md-offset-2">
            {bookmarkTable}
          </div>

          <div className="col-sm-12 col-md-9 col-md-offset-2 top-buffer-50">
            {loadMoreView}
          </div>
        </div>

        <div className="top-buffer-50"></div>
      </div>
    );
  }

  render() {
    return (
      <div id="bookmark-list">
        {this.renderLoading()}
        {this.renderErrorView()}

        {this.renderBody()}

      </div>
    );
  }
}
