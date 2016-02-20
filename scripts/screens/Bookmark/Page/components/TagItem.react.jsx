var React = require('react');

var TagItem = React.createClass({

  propTypes: {
    tag: React.PropTypes.any.isRequired
  },

  render: function () {
    var tag = this.props.tag;
    var style = {
      background: tag.color
    };

    return (
      <div className="bookmark__tag label" style={style} key={'tag_' + tag.id}>
        {tag.name}
      </div>
    );
  }
});

module.exports = TagItem;