var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var BookmarkStore = require('../../stores/BookmarkStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var BookmarkActionCreators = require('../../actions/BookmarkActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var BookmarkUtils = require('../../utils/BookmarkUtils.js');

var BookmarksPage = React.createClass({

    getInitialState: function () {
        return {
            bookmarks: BookmarkStore.getAllBookmarks(),
            searchBookmarks: BookmarkStore.getSearchBookmarks(),
            errors: [],
            search: BookmarkStore.getSearch(),
            paging: BookmarkStore.getPaging(),
            searchPaging: BookmarkStore.getSearchPaging()
        };
    },

    componentDidMount: function () {
        if (!SessionStore.isLoggedIn()) {
            RouteActionCreators.redirect('login');
        }

        BookmarkStore.addChangeListener(this._onChange);
        BookmarkActionCreators.loadBookmarks();

        $.material.init();
    },

    componentWillUnmount: function () {
        BookmarkStore.removeErrors();
        BookmarkStore.removeChangeListener(this._onChange);
    },

    handleSearchInput: function (search) {
        this.setState({
            search: search
        });
    },

    handleLoadMore: function () {
            var paging = this.state.paging;
            WebAPIUtils.loadBookmarks(parseInt(paging.page) + 1);
    },

    handleLoadMoreSearch: function () {
    },
    _onChange: function () {
        this.setState({
            bookmarks: BookmarkStore.getAllBookmarks(),
            searchBookmarks: BookmarkStore.getSearchBookmarks(),
            search: BookmarkStore.getSearch(),
            errors: [],
            paging: BookmarkStore.getPaging(),
            searchPaging: BookmarkStore.getSearchPaging()
        });
    },

    render: function () {
        var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;

        var bookmarkTable = (<NoBookmark />);
        var loadMore = "";
        var bookmarks = [];

        if (_.isEmpty(this.state.search.name)) {
            bookmarks = this.state.bookmarks;
            loadMore = (<LoadMore paging={this.state.paging} loadMore={this.handleLoadMore}/>);
        }
        else {
            // Use search bookmarks
            if (!_.isEmpty(this.state.searchBookmarks)) {
                bookmarks = this.state.searchBookmarks;
                loadMore = (<LoadMore paging={this.state.searchPaging} loadMore={this.handleLoadMoreSearch}/>);
            }
            else { // wait for api search, manually search on displayed bookmarks.

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
            bookmarkTable = (<BookmarkTable bookmarks={bookmarks}/>);
        }

        return (
            <div id="bookmark-list">
                {errors}

                <div className="row">

                    <div className="col-xs-12 col-sm-9">

                        <SearchBox search={this.state.search}
                            onSearchInput={this.handleSearchInput}/>

                        <div className="top-buffer-50"/>

                        {bookmarkTable}

                    </div>

                    <div className="col-xs-12 col-sm-9 top-buffer-50">
                        {loadMore}
                    </div>
                </div>

                <div className="top-buffer-50"></div>

            </div>
        )
        ;
    }
});

var BookmarkTable = React.createClass({
    render: function () {
        // Contains the bookmarks rows.
        var rows = [];

        this.props.bookmarks.forEach(function (bookmark) {
            rows.push(<BookmarkItem bookmark={bookmark} key={bookmark.id}/>);
        }.bind(this));

        return (
            <div className="col-xs-12">
                {rows}
            </div>
        );
    }

});

var BookmarkItem = React.createClass({
    render: function () {
        var bookmark = this.props.bookmark;

        return (
            <div className="bookmarks__item bookmark col-xs-12">

                <div className="text-left">
                    <h3 className="bookmarks__item_title">
                        <Link to="bookmark" params={ {bookmarkId: bookmark.id} }>
                            {BookmarkUtils.getDefaultName(bookmark)}
                        </Link>
                    </h3>
                </div>
                <div className="bookmarks__item_body">
                    <div className="bookmarks__item_description">
                        {bookmark.description}
                    </div>
                </div>

                <div className="bookmarks__item_footer">
                    <div className="bookmarks__item_pretty_url">
                        {BookmarkUtils.getPrettyUrl(bookmark.url)}
                    </div>
                </div>

            </div>
        );
    }
});

var NoBookmark = React.createClass({

    render: function () {

        return (
            <div>
                <h3>There is no bookmark</h3>
            </div>
        );
    }

});

var SearchBox = React.createClass({

    handleSubmit: function () {
        console.log('sub');
        var value = this.refs.filterTextInput.getDOMNode().value;
        WebAPIUtils.searchBookmarks(this.props.search);
    },
    handleChange: function () {
        var value = this.refs.filterTextInput.getDOMNode().value;
        this.props.search.name = value;
        this.props.onSearchInput(this.props.search);

        if (!_.isEmpty(value) && value.length >= 3) {
            // TODO: call handleSubmit if the user didn't type for 2 seconds.
        }
        else if (_.isEmpty(value)) {
            // reset
            BookmarkStore.clearSearch();
        }
    },
    render: function () {

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-control-wrapper form-group label-floating">
                    <label className="control-label">Search</label>
                    <input
                        type="text"
                        placeholder=""
                        value={this.props.search.name}
                        ref="filterTextInput"
                        onChange={this.handleChange}
                        className="form-control empty"/>
                    <span className="material-input"/>
                </div>

                <button type="submit">
                    Search
                </button>
            </form>
        );
    }

});

var LoadMore = React.createClass({
    onLoadMore: function () {
        this.props.loadMore();
        this.isLoading = true;
        this.forceUpdate();
    },
    render: function () {
        // -- Loading bar when load more is activated
        if (this.isLoading && this.isLoading == true) {
            this.isLoading = false;
            return (
                <div className="load_more__loading text-center">
                    Loading...
                </div>
            )
        }

        // -- Load more bar
        var paging = this.props.paging;

        if (paging.page == paging.last_page || paging.last_page == 0) {
            return (<div className="load_more__end"></div>)
        }

        return (
            <div className="load_more text-center">
                Page {paging.page} / {paging.last_page}
                <p onClick={this.onLoadMore}>Load More</p>
            </div>
        );
    }
});

module.exports = BookmarksPage;
