var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

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
        <Link to="tag" params={ {tagId: tag.id} }>
          {tag.name}
        </Link>
      </div>
    );
  }
});

module.exports = TagItem;