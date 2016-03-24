var React = require('react');

var Constants = require('../../../constants/Constants');
var WebApiUtils = require('../../../utils/WebAPIUtils');
var BookmarkStore = require('../../../stores/BookmarkStore.react.jsx');
var Events = require('../../../utils/Events.js');

// -- views
var AddTagListRow = require('./components/AddTagListRow.react.jsx');
var AddTagColorList = require('./components/AddTagColorList.react.jsx');

var AddTag = React.createClass({

  propTypes: {
    allTags: React.PropTypes.array.isRequired,
    bookmark: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      selectedTags: [], // The tags selected to be add on the bookmark.
      tagQuery: "",
      isCreationTagMode: false,
      newTagColor: Constants.Tag.DEFAULT_COLOR,
      loading: false
    };
  },

  componentDidMount: function () {
    $.material.init();
    BookmarkStore.addListener(Events.LOADING_TAGS_CHANGE, this._hideLoading);
  },

  componentWillUnmount: function () {
    BookmarkStore.removeListener(Events.LOADING_TAGS_CHANGE, this._hideLoading);
  },

  _hideLoading: function () {
    this.setState({
      loading: false
    })
  },

  showLoading: function () {
    this.setState({
      loading: true
    })
  },

  displayAddTagMenu: function () {
    this.toggleMenu();
  },

  toggleTag: function (tag) {
    var selectedTags = this.state.selectedTags;

    if (_.indexOf(selectedTags, tag) === -1) { // add tag
      selectedTags.push(tag);
    }
    else { // remove tag
      selectedTags = _.remove(selectedTags, function (n) {
        return n.id != tag.id;
      });
    }

    this.setState({
      selectedTags: selectedTags
    });

  },

  _validateOnClick: function () {

    if (this.state.isCreationTagMode == false) {
      this.showLoading();

      // Add the tags
      WebApiUtils.postTagsToBookmark(this.state.selectedTags, this.props.bookmark);

      this.toggleMenu();

      // clear the search. TODO: remove when the selectedTags is update after the API call to add the tag
      this.updateTagQuery("");
    }
    else {
      this._onCreateNewTag();
    }
  },

  toggleMenu: function () {
    $('#bookmark__tag_list__add_tag_dropdown').parent().toggleClass('open');
    this.setCreationTagModeTo(false);
  },

  _handleSearchChange: function () {
    var query = this.refs.searchTagInput.value;

    // update the tag
    this.updateTagQuery(query);

    var tagsToPropose = this.getTagsToPropose(query);

    if (!_.isEmpty(tagsToPropose)) {
      this.setCreationTagModeTo(false);
    }
    else {
      // Create the tag mode
      this.setCreationTagModeTo(true);
    }
  },

  setCreationTagModeTo: function (mode) {
    this.setState({
      isCreationTagMode: mode
    });
  },

  _onNewTagColorChosen: function (tagColor) {
    this.setState({
      newTagColor: tagColor
    });
  },

  _handleSearchSubmit: function (e) {

    /**
     * On enter, we toggle the first tag of the displayed list (getTagsToPropose).
     * If there is no tag, we create it.
     */
    if (e.key === 'Enter') {
      var query = this.refs.searchTagInput.value;

      var tagsToPropose = this.getTagsToPropose(query);

      if (!_.isEmpty(tagsToPropose)) {
        this.toggleTag(tagsToPropose[0]);
        this.updateTagQuery("");
      }
      else {
        this._onCreateNewTag();
      }
    }

  },

  _onCreateNewTag: function () {
    var query = this.refs.searchTagInput.value;

    var newTag = {
      id: '__' + new Date().getTime(), // used for react "key" prop. It's not a valid API id (begin with __ to be clear)
      color: this.state.newTagColor,
      name: query // We use the current query as tag name.
    };

    this.props.allTags.unshift(newTag);
    this.toggleTag(newTag);

    this.setCreationTagModeTo(false);
    this.updateTagQuery("");
  },

  updateTagQuery: function (query) {

    this.setState({
      tagQuery: query
    });

  },

  getTagsToPropose: function (tagQuery) {
    var tagsToPropose = [];

    // -- Create list of tags that can be add for the bookmark.
    if (!_.isEmpty(this.props.allTags) && !_.isEmpty(this.props.bookmark.tags)) {

      // We propose all the tags minus the tags already set on the bookmark.
      tagsToPropose = _.differenceWith(this.props.allTags, this.props.bookmark.tags,
        function (value, other) {
          return value.id == other.id;
        }
      );

      // -- sort by name
      tagsToPropose = _.sortBy(tagsToPropose, ['asc'], function (tag) {
        return tag.name.toLowerCase();
      });
    }

    // filter by tag query
    if (tagQuery.length > 0) {
      tagsToPropose = _.remove(tagsToPropose.slice(), function (tag) {
        // case insensitive + remove all spaces
        var query = tagQuery.replace(/\s+/g, '').toLowerCase();
        var tagName = tag.name.replace(/\s+/g, '').toLowerCase();
        return tagName.indexOf(query) !== -1;
      });
    }
    else {
      if (_.isUndefined(this.props.allTags)) { // when the page hasn't load yet, allTags can be undefined.
        tagsToPropose = [];
      }
    }

    return tagsToPropose;
  },

  // TODO: replace '+' by loading when add the tag(s) / loading the tags

  render: function () {

    var selectedTags = this.state.selectedTags;

    var tagQuery = this.state.tagQuery;

    var tagsToPropose = this.getTagsToPropose(tagQuery);
    var listView = [];

    /*
     If we are not in creation mode, we display the tags.
     In creation mode, we display a choice of colors
     */
    if (this.state.isCreationTagMode == false) {

      tagsToPropose.forEach(function (tag) {

        // is the tag on the selected tags list?
        var isSelected = _.indexOf(selectedTags, tag) !== -1;

        listView.push(<AddTagListRow tag={tag}
                                     isSelected={isSelected}
                                     onTagClicked={this.toggleTag}
                                     key={tag.id}/>);
      }.bind(this));

    }
    else { // Setup colors list for the new bookmark

      var tagNameToFind = this.state.tagQuery.replace(/\s+/g, '').toLowerCase();

      var found = _.find(this.props.bookmark.tags, function (bookmarkTag) {
        // case insensitive + remove all spaces
        var bookmarkTagName = bookmarkTag.name.replace(/\s+/g, '').toLowerCase();
        return tagNameToFind.localeCompare(bookmarkTagName) === 0;
      });

      console.log(found);
      if (!_.isUndefined(found)) { // verify that the tags is not already set to the bookmark.
        listView = (
          <div className="bookmark__tag_list__tag_already_exists">
            <em>Tag already set with this name.</em>
          </div>
        );
      }
      else {

        listView = (
          <AddTagColorList
            defaultSelection={this.state.newTagColor}
            onColorChosen={this._onNewTagColorChosen}/>
        );
      }
    }

    // -- Setup button view
    var buttonView = (
      <button id="bookmark__tag_list__add_tag_dropdown"
              className="btn"
              onClick={this.displayAddTagMenu}
              aria-haspopup="true"
              aria-expanded="false">
        +
      </button>
    );

    // When loading (post new tags for the bookmark), we display a loading.
    if (this.state.loading) {
      buttonView = (
        <button className="btn btn-disabled">
          <i className="fa fa-spinner"/>
        </button>
      );
    }

    return (
      <span className="dropdown">
        {buttonView}

        <div className="row dropdown-menu bookmark__tag_list__add_tag_block"
             aria-labelledby="bookmark__tag_list__add_tag_dropdown">

          <div className="col-xs-12 col-sm-12 col-md-8 bookmark__tag_list__add_tag_list__search">
            <div className="form-group label-placeholder">
              <label className="control-label">Search</label>
              <input
                type="text"
                placeholder=""
                value={this.state.tagQuery}
                ref="searchTagInput"
                onChange={this._handleSearchChange}
                onKeyPress={this._handleSearchSubmit}
                className="form-control empty"/>
              <span className="material-input"/>
            </div>
          </div>

          {/* validate btn: only on big screen */}
          <div className="text-center hidden-sm hidden-xs col-md-3">
            <button className="btn btn-primary"
                    onClick={this._validateOnClick}>
              Validate
            </button>
          </div>

          <div className="clear"></div>

          <div className="row bookmark__tag_list__add_tag_list">
            {listView}
          </div>

          {/* validate btn: only on small screen */}
          <div className="text-center col-xs-12 col-sm-12 hidden-md hidden-lg">
              <span className="btn btn-primary"
                    onClick={this._validateOnClick}>
                Validate
              </span>
          </div>

        </div>
        </span>
    )
  }

});


module.exports = AddTag;