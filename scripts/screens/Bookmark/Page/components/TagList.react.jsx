var React = require('react');

var TagItem = require('./TagItem.react.jsx');

var TagList = React.createClass({

  propTypes: {
    tags: React.PropTypes.array
  },

  render: function () {

    if (_.isEmpty(this.props.tags)) {
      return (
        <div className="bookmark__tag_list_empty"></div>
      )
    }

    var tags = [];
    this.props.tags.forEach(function (tag) {
      tags.push(<TagItem tag={tag} key={tag.id}/>);
    }.bind(this));

    return (
      <div className="bookmark__tag_list">
        {tags}
      </div>
    );
  }

});

module.exports = TagList;