var React = require('react');

var _ = require('lodash');

var TagItem = require('./TagItem.react.jsx');

var TagsTable = React.createClass({

  propTypes: {
      tags: React.PropTypes.array.isRequired
  },

  render: function () {
    var tags = this.props.tags;

    // Contains the Page rows.
    var rows = [];

    // Sort by name
    tags = _.sortBy(tags, ['asc'], function (tag) { return tag.name.toLowerCase(); });

    tags.forEach(function (tag) {
      rows.push(<TagItem tag={tag} key={tag.id}/>);
    }.bind(this));

    return (
      <div className="col-xs-12">
        {rows}
      </div>
    );
  }

});

module.exports = TagsTable;