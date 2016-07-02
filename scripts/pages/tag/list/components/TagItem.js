import React, { PropTypes, Component } from 'react';

// -- entities
import Tag from 'entities/Tag';

export default class TagItem extends Component {

  static propTypes = {
    tag: PropTypes.objectOf(Tag).isRequired
  };

  render() {
    const tag = this.props.tag;

    return (
      <div className="tags__item tag col-xs-3">

        <div className="text-left row">

          <div className="col-xs-1">
            <div style={{backgroundColor: tag.color}}
                 className="tag"></div>
          </div>

          <div className="col-xs-10">
            <span className="tags__item_title">
              <Link to="tag" params={ {tagId: tag.id} }>
                {tag.name}
              </Link>
            </span>
          </div>
        </div>

      </div>
    );
  }
}
