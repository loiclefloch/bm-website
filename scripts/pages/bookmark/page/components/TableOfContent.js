import React, { PropTypes, Component } from 'react';

import TOCItem from './TOCItem';

/**
 * Add a table of contents
 * @param html String The html
 * @param items String The different tags to handle
 */
export default class TableOfContent extends Component {

  static propTypes = {
    html: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  };

  render() {
    const html = this.props.html;
    const items = this.props.items.join(',');

    const toc = [];
    let i = 0;

    if (_.isEmpty(html)) {
      return (<div className="toc__empty"></div>);
    }

    const tree = $("<div>" + html + "</div>");
    const elems = tree.find(items);

    elems.each(function() {
      const elem = $(this);
      const title = elem.text();

      let id = '';
      if (!_.isEmpty(elem.attr('id'))) {
        id = elem.attr('id');
      }
      else if (!_.isEmpty(elem.children().attr('id'))) {
        id = elem.children().attr('id');
      }
      else {
        // There is no id.. Waiting for API update.
        id = "";
      }

      const link = '#' + id;
      let tocLevel = 'toc__level_';

      if (elem.is('h1')) {
        tocLevel += "h1"
      }
      else if (elem.is('h2')) {
        tocLevel += "h2"
      }
      else if (elem.is('h3')) {
        tocLevel += "h3"
      }
      else if (elem.is('h4')) {
        tocLevel += "h4"
      }

      toc.push(<TOCItem level={tocLevel} link={link} title={title} key={i + '_' + title} />);
      i = i + 1
    });

    return (<div className="toc">{toc}</div>);
  }
}
