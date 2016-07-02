import React from 'react';

// -- store
import TagStore from 'stores/TagStore.react.jsx';
import SessionStore from 'stores/SessionStore.react.jsx';

// -- constants
import Events from 'constants/Events';

// -- actions
import TagAction from 'actions/TagAction.react.jsx';
import RouteAction from 'actions/RouteAction.react.jsx';

// -- views
import AbstractComponent from 'abstracts/AbstractComponent';
import ErrorNotice from 'components/ErrorNotice.react.jsx';
import LoadMore from './components/LoadMore';
import SearchBox from './components/SearchBox';
import TagsTable from './components/TagsTable';
import NoTag from './components/NoTag';

export default class TagListPage extends AbstractComponent {

  state = {
    tags: TagStore.getAllTags(),
    searchTags: TagStore.getSearchTags(),
    search: TagStore.getSearch(),
    paging: TagStore.getPaging(),
    searchPaging: TagStore.getSearchPaging()
  };


  componentDidMount() {
    if (!SessionStore.isLoggedIn()) {
      RouteAction.redirect('login');
    }

    // Do not display the loading if we have already load the Page.
    // For example, when we came back to this page from the tag page.
    if (_.isEmpty(this.state.tags)) {
      this.displayLoading();
    }


    TagStore.addListener(Events.CHANGE, this._onChange);
    TagStore.addListener(Events.LOADING, this.hideLoading);

    if (_.isEmpty(this.state.tags)) { // do not call if we came back on the page
      TagAction.loadTags();
    }

    $.material.init();
  }

  componentWillUnmount() {
    TagStore.removeErrors();
    TagStore.removeListener(Events.CHANGE, this._onChange);
    TagStore.removeListener(Events.LOADING, this.hideLoading);
  }

  handleSearchInput(search) {
    this.setState({
      search: search
    });
  }

  handleSearchSubmit(search) {
    this.displayLoading();
    WebAPIUtils.searchTags(search);
  }

  handleLoadMore() {
    const paging = this.state.paging;
    this.displayLoading();
    WebAPIUtils.loadTags(parseInt(paging.page) + 1);
  }

  handleLoadMoreSearch() {
    const paging = this.state.searchPaging;
    this.displayLoading();
    WebAPIUtils.loadTags(this.state.search, parseInt(paging.page) + 1);
  }

  _onChange() {
    this.setState({
      tags: TagStore.getAllTags(),
      searchTags: TagStore.getSearchTags(),
      search: TagStore.getSearch(),
      paging: TagStore.getPaging(),
      searchPaging: TagStore.getSearchPaging()
    });
  }

  render() {
    let tagTable = (<div className="tags__loading"></div>);
    let loadMore = (null);
    let tagsList = [];

    if (_.isEmpty(this.state.search.name)) {
      console.log(this.state);
      tagsList = this.state.tags;
      loadMore = (<LoadMore paging={this.state.paging} loadMore={this.handleLoadMore} />);
    }
    else {
      // Use search Page
      if (!_.isEmpty(this.state.searchTags)) {
        tagsList = this.state.searchTags;
        loadMore = (
          <LoadMore paging={this.state.searchPaging} loadMore={this.handleLoadMoreSearch} />);
      }
      else { // wait for api search, manually search on displayed Page.

        this.state.tags.forEach(function(tag) {
          const name = tag.name;
          const filterText = this.state.search.name.toLowerCase();

          // A simple filter no case sensitive
          if (name.indexOf(filterText) >= 0) {
            tagsList.push(tag);
          }

        }.bind(this));

      }

    }

    if (!_.isEmpty(tagsList)) {
      tagTable = (<TagsTable tags={tagsList} />);
    }
    else if (_.isEmpty(tagsList) && this.state.loading == false) {
      tagTable = (<NoTag />);
    }

    return (
      <div id="bookmark-list">
        {this.renderErrorView()}
        {this.renderLoading()}

        {/*
         <Fab />
         */}
        <div className="row">

          <div className="col-sm-12 col-md-9 col-md-offset-2">

            <SearchBox search={this.state.search}
                       onSearchSubmit={this.handleSearchSubmit}
                       onSearchInput={this.handleSearchInput} />

            <div className="top-buffer-50"></div>

            {tagTable}

          </div>

          <div className="col-sm-12 col-md-9 col-md-offset-2 top-buffer-50">
            {loadMore}
          </div>
        </div>

        <div className="top-buffer-50"></div>

      </div>

    );

  }
}
