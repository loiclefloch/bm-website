var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var BookmarkStore = require('../../stores/BookmarkStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var BookmarkActionCreators = require('../../actions/BookmarkActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var moment = require('moment');

var BookmarksPage = React.createClass({

  getInitialState: function () {
    return {
      bookmarks: BookmarkStore.getAllBookmarks(),
      errors: []
    };
  },

  componentDidMount: function () {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }

    BookmarkStore.addChangeListener(this._onChange);
    BookmarkActionCreators.loadBookmarks();

    $('#bookmarks-tab').tab();
  },

  componentWillUnmount: function () {
    BookmarkStore.removeErrors();
    BookmarkStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({
      bookmarks: BookmarkStore.getAllBookmarks(),
      errors: BookmarkStore.getErrors()
    });
  },

  render: function () {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;

    var bookmarks = this.state.bookmarks;

    var bookmarksForDay = [[], [], [], [], [], [], []];

    // -- Populate the bookmarks for day array.
    for (var i = 0; i < bookmarks.length; i++) {
      var bookmark = bookmarks[i];
      for (var j = 0; j < 7; j++) {
        if (bookmark.days[j] == true) {
          bookmarksForDay[j].push(bookmark);
        }
      }
    }

    // -- Sort the bookmarks for day array.
    for (i = 0; i < 7; i++) {
      bookmarksForDay[i].sort(function (a, b) {
        var momentA = moment(a.hour + ":" + a.minute, "HH:mm");
        var momentB = moment(b.hour + ":" + b.minute, "HH:mm");
        return momentA.diff(momentB);
      });
    }

    return (
      <div id="bookmark-list">
        {errors}
        <div className="page-header">
          <h1>Bookmarks</h1>
        </div>

        {bookmarks.map(function(bookmark, index) {
          return <BookmarkItem bookmark={bookmark} key={"bookmark-" + index}/>
          })}

      </div>
    )
      ;
  }
});

var BookmarkItem = React.createClass({
  render: function () {
    return (
      <div className="bookmark col-xs-12 col-md-2 panel panel-default">

        <div className="bookmark__title text-center">
          <h4>
            <Link to="bookmark" params={ {bookmarkId: this.props.bookmark.id} }>
              {this.props.bookmark.name}
            </Link>
          </h4>
        </div>
        <div className="panel-body">

          <div className="bookmark__date text-center">{this.props.bookmark.hour}:{this.props.bookmark.minute}</div>
        </div>

      </div>
    );
  }
});


module.exports = BookmarksPage;

