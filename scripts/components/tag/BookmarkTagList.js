import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

// -- constants
import Events from 'constants/Events';

// -- entities
import Bookmark from 'entities/Bookmark';
import TagsList from 'entities/TagsList';

// -- views
import AddTag from 'components/tag/AddTag';
import TagItem from './TagItem';

export default class BookmarkTagList extends Component {

  static propTypes = {
    bookmark: PropTypes.objectOf(Bookmark).isRequired,

    tagsList: PropTypes.objectOf(TagsList).isRequired,

    deleteTag: PropTypes.func.isRequired
  };

  render() {
    // -- Create tags list view.
    const tagsListView = [];

    if (!_.isUndefined(this.props.bookmark.tags)) {
      this.props.bookmark.tags.forEach((tag) => {
        tagsListView.push(
          <TagItem
            tag={tag}
            key={tag.id}
            deleteTag={this.props.deleteTag}
          />
        );
      });
    }

    const addTagView = (
      <AddTag
        tagsList={this.props.tagsList}
        bookmark={this.props.bookmark}
      />
    );

    // -- there is no tags yet
    if (_.isEmpty(this.props.bookmark.tags)) {
      return (
        <div className="bookmark__tag_list bookmark__tag_list_empty">
          {addTagView}
        </div>
      );
    }

    // -- List the tags
    return (
      <div className="bookmark__tag_list">
        {tagsListView}
        {addTagView}
      </div>
    );
  }

}
