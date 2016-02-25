var React = require('react');

var WebAPIUtils = require('../../../utils/WebAPIUtils.js');
var TagStore = require('../../../stores/TagStore.react.jsx');
var SessionStore = require('../../../stores/SessionStore.react.jsx');

var Events = require('../../../utils/Events.js');

var TagActionCreators = require('../../../actions/TagActionCreators.react.jsx');
var RouteActionCreators = require('../../../actions/RouteActionCreators.react.jsx');

var State = require('react-router').State;
var moment = require('moment');
var showdown = require('showdown');
var _ = require('lodash');

var Loading = require('../../Common/Loading.react.jsx');
var BookmarksTable  = require('../../Bookmark/List/components/BookmarksTable.react.jsx');
var NoBookmarkForTag = require('./components/NoBookmarkForTag.react.jsx');

var TagPage = React.createClass({

  mixins: [State],

  getInitialState: function () {
    return {
      tag: TagStore.getTag(),
      errors: [],
      loading: true
    };
  },

  componentDidMount: function () {

    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('login');
    }

    TagStore.addListener(Events.CHANGE, this._onChange);
    TagStore.addListener(Events.LOADING, this._onLoadingEnd);

    TagActionCreators.loadTag(this.getParams().tagId);
  },

  componentWillUnmount: function () {
    TagStore.removeListener(Events.CHANGE, this._onChange);
    TagStore.removeListener(Events.LOADING, this._onLoadingEnd);
    TagStore.clearTag();
  },

  displayLoading: function () {
    this.setState({
      loading: true
    });
  },

  _onChange: function () {
    this.setState({
      tag: TagStore.getTag(),
      errors: TagStore.getErrors()
    });
  },

  _onLoadingEnd: function () {
    this.setState({
      loading: false
    });
  },

  _deleteTag: function (e) {
    e.preventDefault();
    var tag = this.state.tag;
    var self = this;
    bootbox.confirm("Are you sure you want to remove the tag " + tag.name + "?", function (result) {
      if (result == true) {
        self.displayLoading();
        WebAPIUtils.deleteTag(tag.id);
      }
    });

  },

  render: function () {

    var tag = this.state.tag;

    var bookmarkTable = (<div></div>);
    if (!_.isEmpty(tag.bookmarks)) {
      bookmarkTable = (<BookmarksTable bookmarks={tag.bookmarks}/>);
    }
    else if (this.loading) {
      bookmarkTable = (<NoBookmarkForTag />);
    }

    var separatorStyle = {
      "height": '15px',
      "width": '100%',
      "background": tag.color
    };

    return (
      <div id="tag">
        <Loading display={this.state.loading}/>

        <div>
          <div className="tag__page_header">
            <h1 className="tag__title">{tag.name}</h1>
          </div>

          <div className="top-buffer-20" style={separatorStyle}></div>

          <div className="tag__action_bar top-buffer-50">
            <a href="#" onClick={this._deleteTag}>
              <i className="fa fa-trash"/>
            </a>
          </div>
        </div>

        <div className="tag__bookmarks_list top-buffer-50">
          {bookmarkTable}
        </div>
      </div>

    );
  }

});

module.exports = TagPage;

