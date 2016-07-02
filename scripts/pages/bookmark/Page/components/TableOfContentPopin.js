import React, { PropTypes, Component } from 'react';

// -- entities
import Bookmark from 'entities/Bookmark';

// -- views
import TableOfContent from './TableOfContent';

export default class TableOfContentPopin extends Component {

  static propTypes = {
    bookmark: PropTypes.objectOf(Bookmark).isRequired
  };

  render() {
    let toc = (<div className="toc_popin__empty_toc"></div>);
    if (!_.isEmpty(this.props.bookmark.content)) {

      const jContent = $(this.props.bookmark.content);
      const nbH1 = jContent.find('h1').length;
      const nbH2 = jContent.find('h2').length;
      const nbH3 = jContent.find('h3').length;

      console.log('TOC nb', nbH1, nbH2, nbH3);

      const levels = [];

      if (nbH1 > 1) {
        levels.push('h1');
      }

      if (nbH2 > 1) {
        levels.push('h2');
      }

      if (nbH3 > 1 && nbH3 < 30) { // 30: don't want to display to many levels. Keep it simple.
        levels.push('h3');
      }

      if (nbH1 > 1) {
        levels.push('h1');
      }

      toc = (
        <TableOfContent
          html={this.props.bookmark.content}
          items={levels}
        />
      );
    }

    return (
      <div className="modal fade" tabIndex="-1" role="dialog" id="toc_modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Table Of Content</h4>
            </div>
            <div className="modal-body">
              {toc}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
