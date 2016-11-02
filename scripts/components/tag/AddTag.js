import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

import Constants from 'constants/Constants';
import WebApiUtils from 'utils/Api';
// import BookmarkStore from 'stores/BookmarkStore';
// import Events from 'constants/Events';

// -- entities
import TagsList from 'entities/TagsList';

// -- views
import { DropdownButton } from 'react-bootstrap';
import AddTagListRow from './components/AddTagListRow';
import AddTagColorList from './components/AddTagColorList';

export default class AddTag extends Component {

  static propTypes = {
    tagsList: PropTypes.objectOf(TagsList).isRequired,
    bookmark: PropTypes.object.isRequired
  };

  state = {
    selectedTags: [], // The tags selected to be add on the bookmark.
    tagQuery: '',
    isCreationTagMode: false,
    newTagColor: Constants.Tag.DEFAULT_COLOR,
    loading: false,

    displayDropdown: false
  };

  componentDidMount() {
    $.material.init();
  }

  componentWillReceiveProps(nextProps) {
    if ((!_.isNull(nextProps.tagsList) && !nextProps.tagsList.equals(this.props.tagsList))
    || !nextProps.bookmark.equals(this.props.bookmark)) {
      this.setState({
        loading: false
      });
    }
  }

  updateTagQuery = (query) => {
    this.setState({
      tagQuery: query
    });
  }

  getTagsToPropose(tagQuery) {
    let tagsToPropose = [];

    // -- Create list of tags that can be add for the bookmark.
    if (!_.isNull(this.props.tagsList) && !_.isEmpty(this.props.bookmark.tags)) {
      // We propose all the tags minus the tags already set on the bookmark.
      tagsToPropose = _.differenceWith(this.props.tagsList.tags, this.props.bookmark.tags,
        (value, other) => {
          return value.id === other.id;
        }
      );

      // -- sort by name
      tagsToPropose = _.sortBy(tagsToPropose, ['asc'], (tag) => {
        return tag.name.toLowerCase();
      });
    }

    // filter by tag query
    if (tagQuery.length > 0) {
      tagsToPropose = _.remove(tagsToPropose.slice(), (tag) => {
        // case insensitive + remove all spaces
        const query = tagQuery.replace(/\s+/g, '').toLowerCase();
        const tagName = tag.name.replace(/\s+/g, '').toLowerCase();
        return tagName.indexOf(query) !== -1;
      });
    } else {
      // when the page hasn't load yet, tagsList can be undefined.
      if (_.isUndefined(this.props.tagsList)) {
        tagsToPropose = [];
      }
    }

    return tagsToPropose;
  }

  handleHideLoading = () => {
    this.setState({
      loading: false
    });
  };

  handleShowLoading = () => {
    this.setState({
      loading: true
    });
  };

  onToggleTag = (tag) => {
    let selectedTags = this.state.selectedTags;

    if (_.indexOf(selectedTags, tag) === -1) { // add tag
      selectedTags.push(tag);
    } else { // remove tag
      selectedTags = _.remove(selectedTags, (n) => {
        return n.id !== tag.id;
      });
    }

    this.setState({
      selectedTags
    });
  };

  onValidate = () => {
    if (this.state.isCreationTagMode === false) {
      this.handleShowLoading();

      if (!_.isEmpty(this.state.selectedTags)) {
        // Add the tags
        WebApiUtils.postTagsToBookmark(this.state.selectedTags, this.props.bookmark);
      }
      this.onToggleMenu();

      // clear the search. TODO: remove when the selectedTags is update after the API call to
      // add the tag
      this.updateTagQuery('');
    } else {
      this.onCreateNewTag();
    }
  };

  onToggleMenu = () => {
    this.setState({
      displayDropdown: !this.state.displayDropdown
    });

    this.onChangeCreationTagMode(false);
  };

  onSearchChange = (event) => {
    const query = event.target.value;

    // update the tag
    this.updateTagQuery(query);

    const tagsToPropose = this.getTagsToPropose(query);

    if (!_.isEmpty(tagsToPropose)) {
      this.onChangeCreationTagMode(false);
    } else {
      // Create the tag mode
      this.onChangeCreationTagMode(true);
    }
  };

  onChangeCreationTagMode = (mode) => {
    this.setState({
      isCreationTagMode: mode
    });
  };

  onNewTagColorChosen = (tagColor) => {
    this.setState({
      newTagColor: tagColor
    });
  };

  onSearchSubmit = (e) => {
    /**
    * On enter, we toggle the first tag of the displayed list (getTagsToPropose).
    * If there is no tag, we create it.
    */
    if (e.key === 'Enter') {
      const query = this.state.tagQuery;

      const tagsToPropose = this.getTagsToPropose(query);

      if (!_.isEmpty(tagsToPropose)) {
        this.onToggleTag(tagsToPropose[0]);
        this.updateTagQuery('');
      } else {
        this.onCreateNewTag();
      }
    }
  };

  onCreateNewTag = () => {
    const query = this.state.tagQuery;

    const newTag = {
      // used for react "key" prop. It's not a valid API id (begin with __ to be clear)
      id: `__${new Date().getTime()}`,
      color: this.state.newTagColor,
      name: query // We use the current query as tag name.
    };

    this.props.tagsList.tags.unshift(newTag);
    this.onToggleTag(newTag);

    this.onChangeCreationTagMode(false);
    this.updateTagQuery('');
  }

  //
  // Renderers
  //

  renderButtons() {
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={this.onToggleMenu}
        >
          Cancel
        </button>

        <button
          className="btn btn-primary"
          onClick={this.onValidate}
        >
          Validate
        </button>
      </div>
    );
  }

  renderListView() {
    const selectedTags = this.state.selectedTags;
    const tagQuery = this.state.tagQuery;
    const tagsToPropose = this.getTagsToPropose(tagQuery);

    /*
    If we are not in creation mode, we display the tags.
    In creation mode, we display a choice of colors
    */
    if (this.state.isCreationTagMode === false) {
      const listView = [];
      tagsToPropose.forEach((tag) => {
        // is the tag on the selected tags list?
        const isSelected = _.indexOf(selectedTags, tag) !== -1;

        listView.push(
          <AddTagListRow
            tag={tag}
            isSelected={isSelected}
            onTagClicked={this.onToggleTag}
            key={tag.id}
          />
        );
      });

      return (listView);
    } else { // Setup colors list for the new bookmark
      const tagNameToFind = this.state.tagQuery.replace(/\s+/g, '').toLowerCase();

      const found = _.find(this.props.bookmark.tags, (bookmarkTag) => {
        // case insensitive + remove all spaces
        const bookmarkTagName = bookmarkTag.name.replace(/\s+/g, '').toLowerCase();
        return tagNameToFind.localeCompare(bookmarkTagName) === 0;
      });

      if (!_.isUndefined(found)) { // verify that the tags is not already set to the bookmark.
        return (
          <div className="bookmark__tag_list__tag_already_exists">
            <em>Tag already set with this name.</em>
          </div>
        );
      } else {
        return (
          <AddTagColorList
            defaultSelection={this.state.newTagColor}
            onColorChosen={this.onNewTagColorChosen}
          />
        );
      }
    }
  }

  render() {
    // -- Setup button view
    let buttonView = (
      <button
        className="btn"
        onClick={this.onToggleMenu}
      >
        +
      </button>
    );

    // When loading (post new tags for the bookmark), we display a loading.
    if (this.state.loading) {
      buttonView = (
        <button className="btn btn-disabled">
          <i className="fa fa-spinner fa-spin" />
        </button>
      );
    }

    return (
      <span>
        {buttonView}

        {this.state.displayDropdown &&
          <div
            className="row bookmark__tag_list__add_tag_block"
          >

            <div className="col-xs-12 col-sm-12 col-md-8 bookmark__tag_list__add_tag_list__search">
              <div className="form-group label-placeholder">
                <label className="control-label">Search</label>
                <input
                  type="text"
                  placeholder=""
                  value={this.state.tagQuery}
                  onChange={this.onSearchChange}
                  onKeyPress={this.onSearchSubmit}
                  autoFocus
                  className="form-control empty"
                />
                <span className="material-input" />
              </div>
            </div>

            <div className="clear"></div>

            <div className="row bookmark__tag_list__add_tag_list">
              {this.renderListView()}
            </div>

            <div className="text-center col-xs-12">
              {this.renderButtons()}
            </div>
          </div>
        }
      </span>
    );
  }
}
