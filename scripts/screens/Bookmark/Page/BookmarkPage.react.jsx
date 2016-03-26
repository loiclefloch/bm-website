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

var FontAwesome = require('react-fontawesome');

//var Loading = require('../../Common/Loading.react.jsx');
var HtmlBlock = require('../../Common/HtmlBlock.react.jsx');
var BookmarkFloatMenu = require('./components/BookmarkFloatMenu.react.jsx');
var BookmarkTagList = require('./components/BookmarkTagList.react.jsx');
var BookmarkContent = require('./components/BookmarkContent.react.jsx');
var TableOfContentPopin = require('./components/TableOfContentPopin.react.jsx');
var BookmarkEstimatedReadingTime = require('../../Common/Bookmark/BookmarkEstimatedReadingTime.react.jsx')

var LoadingMixin = require('../../Common/Mixins/LoadingMixin.react.jsx');
var ErrorMixin = require('../../Common/Mixins/ErrorMixin.react.jsx');

var BookmarkPage = React.createClass({

  mixins: [State, LoadingMixin, ErrorMixin],

  getInitialState: function () {
    return {
      bookmark: BookmarkStore.getBookmark(),
    };
  },

  componentDidMount: function () {
    this.displayLoading();

    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }

    BookmarkStore.addListener(Events.CHANGE, this._onChange);
    BookmarkStore.addListener(Events.LOADING, this.hideLoading);
    BookmarkStore.addListener(Events.TAGS_CHANGE_FOR_BOOKMARK, this._onChange);

    BookmarkActionCreators.loadBookmark(this.getParams().bookmarkId);
  },

  componentWillUnmount: function () {
    BookmarkStore.removeListener(Events.CHANGE, this._onChange);
    BookmarkStore.removeListener(Events.LOADING, this.hideLoading);
    BookmarkStore.removeListener(Events.TAGS_CHANGE_FOR_BOOKMARK, this._onChange);

    BookmarkStore.clearBookmark();
  },

  _onChange: function () {
    this.setState({
      bookmark: BookmarkStore.getBookmark()
    });

    this.handleError(BookmarkStore.getErrors());
  },

  _deleteBookmark: function (e) {
    e.preventDefault();
    var bookmark = this.state.bookmark;
    var self = this;
    bootbox.confirm('Are you sure you want to remove the bookmark "' + BookmarkUtils.getDefaultName(bookmark) + '"?', function (result) {
      if (result == true) {
        self.displayLoading();
        WebAPIUtils.deleteBookmark(bookmark.id);
      }
    });

  },

  _deleteTag: function (tag) {
    WebAPIUtils.deleteTagsForBookmark([tag], this.state.bookmark);
  },

  handleChangeUrl: function (newParams) {
    this.context.router.replaceWith(
      this.context.router.getCurrentPathname(),
      this.props.params, newParams
    );

  },

  render: function () {

    var bookmark = this.state.bookmark;

    // Convert markdown
    var converter = new showdown.Converter();
    var notesHtml = converter.makeHtml(bookmark.notes);

    return (
      <div id="bookmark" className="row">
        {this.state.loadingView}

        <BookmarkFloatMenu bookmark={bookmark}/>

        <div className="col-xs-12">
          <div className="bookmark__page_header">
            <h1 className="bookmark__title">{BookmarkUtils.getDefaultName(bookmark)}</h1>
          </div>

          <div className="bookmark__action_bar">

            <BookmarkEstimatedReadingTime readingTime={bookmark.reading_time}/>

            <span type="button" className="btn btn-primary" onClick={this._deleteBookmark}>

              <FontAwesome name="trash-o"
                           size="2x"
                           style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              />

            </span>
          </div>
        </div>

        <div className="col-xs-12">

          { bookmark.preview_picture &&
          <div className="bookmark__preview_picture">
            <img src={bookmark.preview_picture} className="bookmark__preview_picture__img"/>
          </div>}

          { bookmark.description &&
          <div>
            <hr />
            <p>{bookmark.description}</p>
          </div>}

          <div className="top-buffer-30">
            <BookmarkTagList bookmark={bookmark} deleteTag={this._deleteTag}/>
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
          <BookmarkContent content={bookmark.content}
                           type={bookmark.type}
                           urlQueryParams={this.props.query}
                           changeUrl={this.handleChangeUrl}/>
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

