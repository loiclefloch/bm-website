var React = require('react');


var WebAPIUtils = require('../../../utils/WebAPIUtils.js');

var TagStore = require('../../../stores/TagStore.react.jsx');
var SessionStore = require('../../../stores/SessionStore.react.jsx');

var Events = require('../../../utils/Events.js');

var TagActionCreators = require('../../../actions/TagActionCreators.react.jsx');
var RouteActionCreators = require('../../../actions/RouteActionCreators.react.jsx');

var Loading = require('../../Common/Loading.react.jsx');
var ErrorNotice = require('../../Common/ErrorNotice.react.jsx');

var LoadMore = require('./components/LoadMore.react.jsx');
var SearchBox = require('./components/SearchBox.react.jsx');
var TagsTable = require('./components/TagsTable.react.jsx');
var NoTag = require('./components/NoTag.react.jsx');

var TagListPage = React.createClass({

  getInitialState: function () {

    var tags = TagStore.getAllTags();
    var loading = true;
    // Do not display the loading if we have already load the Page.
    // For example, when we came back to this page from the tag page.
    if (!_.isEmpty(tags)) {
      loading = false;
    }

    return {
      tags: tags,
      searchTags: TagStore.getSearchTags(),
      errors: [],
      search: TagStore.getSearch(),
      paging: TagStore.getPaging(),
      searchPaging: TagStore.getSearchPaging(),
      loading: loading
    };

  },

  componentDidMount: function () {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }

    TagStore.addListener(Events.CHANGE, this._onChange);
    TagStore.addListener(Events.LOADING, this._onLoadingEnd);

    if (_.isEmpty(this.state.tags)) { // do not call if we came back on the page
      TagActionCreators.loadTags();
    }

    $.material.init();
  },

  componentWillUnmount: function () {
    TagStore.removeErrors();
    TagStore.removeListener(Events.CHANGE, this._onChange);
    TagStore.removeListener(Events.LOADING, this._onLoadingEnd);
  },

  handleSearchInput: function (search) {
    this.setState({
      search: search
    });
  },

  handleSearchSubmit: function (search) {
    this.displayLoading();
    WebAPIUtils.searchTags(search);
  },

  handleLoadMore: function () {
    var paging = this.state.paging;
    this.displayLoading();
    WebAPIUtils.loadTags(parseInt(paging.page) + 1);
  },

  handleLoadMoreSearch: function () {
    var paging = this.state.searchPaging;
    this.displayLoading();
    WebAPIUtils.loadTags(this.state.search, parseInt(paging.page) + 1);
  },


  _onChange: function () {
    console.log('on change');

    this.setState({
      tags: TagStore.getAllTags(),
      searchTags: TagStore.getSearchTags(),
      search: TagStore.getSearch(),
      errors: [],
      paging: TagStore.getPaging(),
      searchPaging: TagStore.getSearchPaging()
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

    var tagTable = (<div className="tags__loading"></div>);
    var loadMore = "";
    var tags = [];

    if (_.isEmpty(this.state.search.name)) {
      console.log(this.state);
      tags = this.state.tags;
      loadMore = (<LoadMore paging={this.state.paging} loadMore={this.handleLoadMore}/>);
    }
    else {
      // Use search Page
      if (!_.isEmpty(this.state.searchTags)) {
        tags = this.state.searchTags;
        loadMore = (<LoadMore paging={this.state.searchPaging} loadMore={this.handleLoadMoreSearch}/>);
      }
      else { // wait for api search, manually search on displayed Page.

        this.state.tags.forEach(function (tag) {
          var name = tag.name;
          var filterText = this.state.search.name.toLowerCase();

          // A simple filter no case sensitive
          if (name.indexOf(filterText) >= 0) {
            tags.push(tag);
          }

        }.bind(this));

      }

    }

    if (!_.isEmpty(tags)) {
      tagTable = (<TagsTable tags={tags}/>);
    }
    else if (_.isEmpty(tags) && this.state.loading == false) {
      tagTable = (<NoTag />);
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
});


module.exports = TagListPage;