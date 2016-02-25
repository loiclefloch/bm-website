var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var TagItem = React.createClass({

  propTypes: {
      tag: React.PropTypes.any.isRequired
  },

  render: function () {
    var tag = this.props.tag;

    return (
      <div className="tags__item tag col-xs-3">

        <div className="text-left">
          <h3 className="tags__item_title">
            <Link to="tag" params={ {tagId: tag.id} }>
              {tag.name}
            </Link>
          </h3>
        </div>

      </div>
    );
  }
});

module.exports = TagItem;