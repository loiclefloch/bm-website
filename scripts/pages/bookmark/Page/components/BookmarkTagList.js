import React, { PropTypes, Component } from 'react';

// -- stores
import TagStore from 'stores/TagStore';

// -- actions
import TagAction from 'actions/TagAction';

// -- constants
import Events from 'constants/Events';

// -- entities
import Bookmark from 'entities/Bookmark';

// -- views
import AddTag from 'components/tag/AddTag';
import TagItem from './TagItem';

export default class BookmarkTagList extends Component {

  static propTypes = {
    bookmark: PropTypes.objectOf(Bookmark).isRequired,

    deleteTag: PropTypes.func.isRequired
  };

  state = {
    tagsList: TagStore.getTagsList()
  };

  componentDidMount() {
    TagStore.addListener(Events.CHANGE, this.onChange);

    if (_.isNull(this.state.tagsList)) { // do not call if we came back on the page
      TagAction.loadTags();
    }

  }

  componentWillUnmount() {
    TagStore.removeListener(Events.CHANGE, this.onChange);
  }

  onChange = () => {
    this.setState({
      tagsList: TagStore.getTagsList()
    });
  };

  render() {
    // -- Create tags list view.
    const tagsListView = [];

    if (!_.isUndefined(this.props.bookmark.tags)) {
      this.props.bookmark.tags.forEach(function(tag) {
        tagsListView.push(
          <TagItem
            tag={tag}
            key={tag.id}
            deleteTag={this.props.deleteTag}
          />
        );
      }.bind(this));
    }
    const addTagView = (
      <AddTag
        tagsList={this.state.tagsList}
        bookmark={this.props.bookmark}
      />
    );

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

}
