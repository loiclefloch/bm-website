var React = require('react');

var WebApiUtils = require('../../../../utils/WebAPIUtils');

var TagStore = require('../../../../stores/TagStore.react.jsx');
var TagActionCreators = require('../../../../actions/TagActionCreators.react.jsx');
var Events = require('../../../../utils/Events.js');

var AddTag = require('../../../Common/Tag/AddTag.react.jsx');
var TagItem = require('./TagItem.react.jsx');

var BookmarkTagList = React.createClass({

  propTypes: {
    bookmark: React.PropTypes.object
  },

  getInitialState: function () {
    var tags = TagStore.getAllTags();

    return {
      allTags: tags
    }
  },

  componentDidMount: function () {
    TagStore.addListener(Events.CHANGE, this._onChange);

    if (_.isEmpty(this.state.tags)) { // do not call if we came back on the page
      TagActionCreators.loadTags();
    }

  },

  componentWillUnmount: function () {
    TagStore.removeListener(Events.CHANGE, this._onChange);
  },

  _onChange: function () {
    this.setState({
      allTags: TagStore.getAllTags()
    });
  },

  render: function () {

    // -- Create tags list view.
    var tagsListView = [];
    this.props.bookmark.tags.forEach(function (tag) {
      tagsListView.push(<TagItem tag={tag} key={tag.id}/>);
    }.bind(this));

    var addTagView = (<AddTag allTags={this.state.allTags}
                              bookmark={this.props.bookmark}/>);

    // -- there is no tags yet
    if (_.isEmpty(this.props.bookmark.tags)) {
      return (
        <div className="bookmark__tag_list bookmark__tag_list_empty">
          {addTagView}
        </div>
      )
    }

    // -- List the tags
    return (
      <div className="bookmark__tag_list">
        {tagsListView}
        {addTagView}
      </div>
    );
  }

});

module.exports = BookmarkTagList;