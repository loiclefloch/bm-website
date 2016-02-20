var React = require('react');

var WebAPIUtils = require('../../../utils/WebAPIUtils.js');
var BookmarkStore = require('../../../stores/BookmarkStore.react.jsx');
var SessionStore = require('../../../stores/SessionStore.react.jsx');

var Events = require('../../../utils/Events.js');

var BookmarkActionCreators = require('../../../actions/BookmarkActionCreators.react.jsx');
var RouteActionCreators = require('../../../actions/RouteActionCreators.react.jsx');

var State = require('react-router').State;
var moment = require('moment');
var showdown = require('showdown');
var _ = require('lodash');

var BookmarkUtils = require('../../../utils/BookmarkUtils.js');

var Loading = require('../../Common/Loading.react.jsx');
var HtmlBlock = require('../../Common/HtmlBlock.react.jsx');
var BookmarkFloatMenu = require('./components/BookmarkFloatMenu.react.jsx');
var TagList = require('./components/TagList.react.jsx');
var BookmarkContent = require('./components/BookmarkContent.react.jsx');
var TableOfContentPopin = require('./components/TableOfContentPopin.react.jsx');

var BookmarkPage = React.createClass({

  mixins: [State],

  getInitialState: function () {
    return {
      bookmark: BookmarkStore.getBookmark(),
      errors: [],
      loading: true
    };
  },

  componentDidMount: function () {

    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }

    BookmarkStore.addListener(Events.CHANGE, this._onChange);
    BookmarkStore.addListener(Events.LOADING, this._onLoadingEnd);

    BookmarkActionCreators.loadBookmark(this.getParams().bookmarkId);
  },

  componentWillUnmount: function () {
    BookmarkStore.removeListener(Events.CHANGE, this._onChange);
    BookmarkStore.removeListener(Events.LOADING, this._onLoadingEnd);
    BookmarkStore.clearBookmark();
  },

  displayLoading: function () {
    this.setState({
      loading: true
    });
  },

  _onChange: function () {
    this.setState({
      bookmark: BookmarkStore.getBookmark(),
      errors: BookmarkStore.getErrors()
    });
  },

  _onLoadingEnd: function () {
    this.setState({
      loading: false
    });
  },

  _deleteBookmark: function (e) {
    e.preventDefault();
    var bookmark = this.state.bookmark;
    var self = this;
    bootbox.confirm("Are you sure you want to remove the bookmark " + bookmark.name + "?", function (result) {
      if (result == true) {
        self.displayLoading();
        WebAPIUtils.deleteBookmark(bookmark.id);
      }
    });

  },

  render: function () {

    var bookmark = this.state.bookmark;

    // Convert markdown
    var converter = new showdown.Converter();
    var notesHtml = converter.makeHtml(bookmark.notes);

    return (
      <div id="bookmark" className="row">
        <Loading display={this.state.loading}/>

        <BookmarkFloatMenu bookmark={bookmark}/>

        <div className="col-xs-12">
          <div className="bookmark__page_header">
            <h1 className="bookmark__title">{BookmarkUtils.getDefaultName(bookmark)}</h1>
          </div>

          <div className="bookmark__action_bar row">
            <a href="#" onClick={this._deleteBookmark}>Delete</a>
          </div>
        </div>

        <div className="col-xs-12">

          { bookmark.description &&
          <div>
            <hr />
            <p>{bookmark.description}</p>
          </div>}

          <div className="top-buffer-30">
            <TagList tags={bookmark.tags}/>
          </div>

          <div className="top-buffer-30">
            { bookmark.icon &&
            <div className="bookmark__icon"><img src={bookmark.icon}/></div>
              }
            { !bookmark.icon &&
            <div className="bookmarks__item_no_icon"></div>
              }

            <a href={bookmark.url} target="_blank">
              {BookmarkUtils.getPrettyUrl(bookmark.url)}
            </a>
          </div>

          { bookmark.notes &&
          <div>
            <hr />
            <div dangerouslySetInnerHTML={{__html: notesHtml}}></div>
          </div>}

          <hr />

        </div>

        <div className="col-xs-12">
          <BookmarkContent content={bookmark.content}/>
        </div>

        <div className="col-xs-12 top-buffer-50"></div>

        <div>
          <TableOfContentPopin bookmark={bookmark}/>
        </div>
      </div>

    );
  }

});

module.exports = BookmarkPage;

