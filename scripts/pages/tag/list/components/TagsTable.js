import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

// -- entities
import TagsList from 'entities/TagsList';

// -- views
import TagItem from './TagItem';

export default class TagsTable extends Component {

  static propTypes = {
    tags: PropTypes.objectOf(TagsList).isRequired
  };

  render() {
    // Sort by name
    const tags = _.sortBy(this.props.tags, ['asc'], (tag) => {
      return tag.name.toLowerCase();
    });

    const rows = tags.map((tag) => {
      return (
        <TagItem
          tag={tag}
          key={tag.id}
        />
      );
    });

    return (
      <div className="col-xs-12">
        {rows}
      </div>
    );
  }

}
