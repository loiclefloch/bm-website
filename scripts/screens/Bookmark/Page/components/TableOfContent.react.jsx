var React = require('react');

var TOCItem = require('./TOCItem.react.jsx');

/**
 * Add a table of contents
 * @param html String The html
 * @param items String The different tags to handle
 */
var TableOfContent = React.createClass({

  propTypes: {
    html: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired
  },

  render: function () {
    var html = this.props.html;
    var items = this.props.items.join(',');

    var toc = [];
    var i = 0;

    if (_.isEmpty(html)) {
      return (<div className="toc__empty"></div>);
    }

    var tree = $("<div>" + html + "</div>");
    var elems = tree.find(items);

    elems.each(function () {
      var elem = $(this);
      var title = elem.text();

      var id = '';
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

      var link = '#' + id;

      var tocLevel = 'toc__level_';

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

      toc.push(<TOCItem level={tocLevel} link={link} title={title} key={i + '_' + title}/>);
      i = i + 1
    });

    return (<div className="toc">{toc}</div>)
  }
});

module.exports = TableOfContent;