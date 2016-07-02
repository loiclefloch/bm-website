import React, { PropTypes, Component } from 'react';

export default class NoBookmarkForTag extends Component {

  render() {
    return (
      <div className="tag__bookmarks_empty text-center">
        <h3>There is no bookmarks yet</h3>
      </div>
    );
  }

}
