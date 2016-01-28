var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var BookmarkStore = require('../../stores/BookmarkStore.react.jsx');
var BookmarkActionCreators = require('../../actions/BookmarkActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var State = require('react-router').State;
var moment = require('moment');

var BookmarkPage = React.createClass({

  mixins: [State],

  getInitialState: function () {
    return {
      bookmark: BookmarkStore.getBookmark(),
      errors: []
    };
  },

  componentDidMount: function () {

    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }

    BookmarkStore.addChangeListener(this._onChange);
    BookmarkActionCreators.loadBookmark(this.getParams().bookmarkId);
  },

  componentWillUnmount: function () {
    BookmarkStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({
      bookmark: BookmarkStore.getBookmark(),
      errors: BookmarkStore.getErrors()
    });
  },

  _deleteBookmark: function (e) {
    e.preventDefault();
    bookmark = this.state.bookmark;
    bootbox.confirm("Are you sureyou want to remove the bookmark " + bookmark.name + " ?", function(result) {
      if (result == true) {
        WebAPIUtils.deleteBookmark(bookmark.id);
      }
    });

  },

  render: function () {
    return (
      <div className="row">
        <div className="page-header">
          <h1 className="bookmark__title">{this.state.bookmark.name}</h1>
        </div>
        <div>
          <a href="#" onClick={this._deleteBookmark}>Delete</a>
        </div>
        <div className="bookmark__hours">
          {this.state.bookmark.hour}:{this.state.bookmark.minute}
        </div>
      </div>
    );
  }

});

module.exports = BookmarkPage;

