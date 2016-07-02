import React, { PropTypes } from 'react';

import WebAPIUtils from 'utils/WebAPIUtils';

import BookmarkStore from 'stores/BookmarkStore';
import SessionStore from 'stores/SessionStore';

import Events from 'constants/Events';

// -- actions
import BookmarkAction from 'actions/BookmarkAction';
import RouteAction from 'actions/RouteAction';

import Constants  from 'constants/Constants';
import BookmarkUtils from 'utils/BookmarkUtils';

// -- views
import AbstractComponent from 'abstracts/AbstractComponent';
import ErrorNotice from 'components/ErrorNotice';
import LoadMore from './components/LoadMore';
import SearchBox from './components/SearchBox';
import BookmarksTable from './components/BookmarksTable';
import BookmarksSidebar from './components/BookmarkSidebar';

export default class BookmarkListPage extends AbstractComponent {

  state = {
    bookmarks: BookmarkStore.getAllBookmarks(),
    searchBookmarks: BookmarkStore.getSearchBookmarks(),
    search: BookmarkStore.getSearch(),
    paging: BookmarkStore.getPaging(),
    searchPaging: BookmarkStore.getSearchPaging(),
    bookmarkListType: SessionStore.getIntItemFromSession(Constants.Session.BOOKMARK_LIST_TYPE, ViewConstants.BookmarkListType.SIMPLE)
  };

  componentDidMount() {
    if (!SessionStore.isLoggedIn()) {
      RouteAction.redirect('login');
    }

    BookmarkStore.addListener(Events.CHANGE, this.onChange);
    BookmarkStore.addListener(Events.LOADING, this.hideLoading);

    // do not call if we came back on the page. We need to call if there is only 1 bookmarks
    // because when we create a new bookmark, we are redirect to this page, but the bookmark list is not loaded
    // if we haven't go here before
    if (_.isEmpty(this.state.bookmarks) || this.state.bookmarks.length == 1) {
      BookmarkAction.loadBookmarks();
    }

  }

  componentWillUnmount() {
    BookmarkStore.removeErrors();
    BookmarkStore.removeListener(Events.CHANGE, this.onChange);
    BookmarkStore.removeListener(Events.LOADING, this.hideLoading);
  }

  componentDidUpdate() {
    $.material.init();
  }

  onChange = () => {
    this.setState({
      bookmarks: BookmarkStore.getAllBookmarks(),
      searchBookmarks: BookmarkStore.getSearchBookmarks(),
      search: BookmarkStore.getSearch(),
      paging: BookmarkStore.getPaging(),
      searchPaging: BookmarkStore.getSearchPaging()
    });
  };

  onSearchChange = (search) => {
    this.setState({
      search: search
    });
  };

  onSearchSubmit = (search)=> {
    this.displayLoading();
    BookmarkAction.searchBookmarks(search);
  };

  onLoadMore = ()=> {
    const paging = this.state.paging;
    this.displayLoading();
    BookmarkAction.loadBookmarks(parseInt(paging.page) + 1);
  };

  onLoadMoreSearch = () => {
    const paging = this.state.searchPaging;
    this.displayLoading();
    BookmarkAction.searchBookmarks(this.state.search, parseInt(paging.page) + 1);
  };

  onListTypeChange = (newBookmarkListType) => {
    this.setState({
      bookmarkListType: newBookmarkListType
    });

    SessionStore.saveBookmarkListType(newBookmarkListType);
  };

  render() {
    let bookmarkTable = (null);
    let loadMoreView = (null);
    let bookmarksView = (null);

    if (_.isNull(this.state.bookmarks)) {
      return this.renderOnLoadingContent();
    }

    if (_.isEmpty(this.state.search.name)) {
      bookmarksView = this.state.bookmarks;
      loadMoreView = (<LoadMore paging={this.state.paging} loadMore={this.onLoadMore} />);
    }
    else {
      // Use search Page
      if (!_.isEmpty(this.state.searchBookmarks)) {
        bookmarksView = this.state.searchBookmarks;
        loadMoreView = (
          <LoadMore paging={this.state.searchPaging} loadMore={this.onLoadMoreSearch} />);
      }
      else { // wait for api search, manually search on displayed Page.

        this.state.bookmarks.forEach((bookmark) => {
          const name = BookmarkUtils.getDefaultName(bookmark).toLowerCase();
          const filterText = this.state.search.name.toLowerCase();

          // A simple filter no case sensitive
          if (name.indexOf(filterText) >= 0) {
            bookmarksView.push(bookmark);
          }
        });

      }

    }

    if (!_.isEmpty(bookmarksView)) {
      bookmarkTable = (<BookmarksTable bookmarks={bookmarksView}
                                       bookmarkListType={this.state.bookmarkListType} />);
    }
    else if (_.isEmpty(bookmarksView) && this.state.loading == false) {
      bookmarkTable = (<NoBookmark />);
    }

    return (
      <div id="bookmark-list">
        {this.renderLoading()}
        {this.renderErrorView()}

        <BookmarksSidebar search={this.state.search}
                          onSearchSubmit={this.onSearchSubmit}
                          onSearchInput={this.onSearchChange}
                          bookmarkListType={this.state.bookmarkListType}
                          onChangeListType={this.onListTypeChange} />

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
}
