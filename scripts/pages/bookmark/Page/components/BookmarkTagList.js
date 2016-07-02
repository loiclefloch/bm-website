import React, { PropTypes, Component } from 'react';

// -- stores
import TagStore from 'stores/TagStore';

// -- actions
import TagAction from 'actions/TagAction';

// -- constants
import Events from 'constants/Events';

// -- views
import AddTag from 'components/tag/AddTag';
import TagItem from './TagItem';

export default class BookmarkTagList extends Component {

  static propTypes = {
    bookmark: PropTypes.object,
    deleteTag: PropTypes.func.isRequired
  };

  state = {
    allTags: TagStore.getAllTags()
  };

  componentDidMount() {
    TagStore.addListener(Events.CHANGE, this.onChange);

    if (_.isNull(this.state.tags)) { // do not call if we came back on the page
      TagAction.loadTags();
    }

  }

  componentWillUnmount() {
    TagStore.removeListener(Events.CHANGE, this.onChange);
  }

  onChange = () => {
    this.setState({
      allTags: TagStore.getAllTags()
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
        allTags={this.state.allTags}
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
