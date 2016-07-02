import React, { PropTypes } from 'react';

import Api from 'utils/Api';

// -- stores
import BookmarkStore from 'stores/BookmarkStore';
import SessionStore from 'stores/SessionStore';

// -- actions
import BookmarkAction from 'actions/BookmarkAction';
import RouteAction from 'actions/RouteAction';

// -- constants
import Events from 'constants/Events';
import ViewConstants from 'constants/ViewConstants';
import Constants  from 'constants/Constants';

// -- entities
import Bookmark from 'entities/Bookmark';

// -- views
import AbstractComponent from 'abstracts/AbstractComponent';
import LoadMore from './components/LoadMore';
import SearchBox from './components/SearchBox';
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
    bookmarkListType: SessionStore.getBookmarkListType()
  };

  componentDidMount() {
    if (!SessionStore.isLoggedIn()) {
      RouteAction.redirect('login');
    }

    BookmarkStore.addListener(Events.CHANGE, this.onChange);
    BookmarkStore.addListener(Events.LOADING, this.hideLoading);

    // do not call if we came back on the page. We need to call if there is only 1 bookmarks
    // because when we create a new bookmark, we are redirect to this page, but the bookmark list is not loaded
    // if we haven't went there before
    if (_.isNull(this.state.bookmarksList) || this.state.bookmarks.bookmarksList == 1) {
      this.showLoading();
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
      bookmarksList: BookmarkStore.getAllBookmarksList(),
      searchBookmarks: BookmarkStore.getSearchBookmarksList(),
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
    this.showLoading();
    BookmarkAction.searchBookmarks(search);
  };

  onLoadMore = ()=> {
    const paging = this.state.paging;
    this.showLoading();
    BookmarkAction.loadBookmarks(parseInt(paging.page) + 1);
  };

  onLoadMoreSearch = () => {
    const paging = this.state.searchPaging;
    this.showLoading();
    BookmarkAction.searchBookmarks(this.state.search, parseInt(paging.page) + 1);
  };

  onListTypeChange = (newBookmarkListType) => {
    this.setState({
      bookmarkListType: newBookmarkListType
    });

    SessionStore.saveBookmarkListType(newBookmarkListType);
  };

  renderBody() {
    let bookmarkTable = (null);
    let loadMoreView = (null);
    let bookmarks = [];

    if (_.isNull(this.state.bookmarksList)) {
      return this.renderOnLoadingContent();
    }

    if (_.isEmpty(this.state.search.name)) {
      bookmarks = this.state.bookmarksList;
      loadMoreView = (<LoadMore paging={this.state.paging} loadMore={this.onLoadMore} />);
    }
    else {
      // Use search Page
      if (!_.isEmpty(this.state.searchBookmarks)) {
        bookmarks = this.state.searchBookmarks;
        loadMoreView = (
          <LoadMore paging={this.state.searchPaging} loadMore={this.onLoadMoreSearch} />);
      }
      else { // wait for api search, manually search on displayed Page.
        this.state.bookmarksList.bookmarks.forEach((bookmark:Bookmark) => {
          const name = bookmark.getDefaultName().toLowerCase();
          const filterText = this.state.search.name.toLowerCase();

          // A simple filter no case sensitive
          if (name.indexOf(filterText) >= 0) {
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
    }
    else if (_.isEmpty(bookmarks) && this.state.loading == false) {
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
