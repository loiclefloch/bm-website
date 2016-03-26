var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var TagItem = React.createClass({

  propTypes: {
    tag: React.PropTypes.any.isRequired,
    deleteTag: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      isOpen: false,
      isDeleting: false
    }
  },

  componentDidUpdate: function () {

  },

  _onDeleteTag: function () {
    this.setState({
      isDeleting: true
    });
    this.props.deleteTag(this.props.tag);
  },

  toggleMenu: function () {
    $('.tag_dropdown_menu').parent().removeClass('open');

    if (!this.state.isOpen) {
      $('.tag_dropdown_menu__' + this.props.tag.id).parent().addClass('open');
    }

    this.setState({
      isOpen: !this.state.isOpen
    })
  },

  render: function () {
    var tag = this.props.tag;
    var style = {
      background: tag.color
    };

    return (
      <div className="bookmark__tag label pointer not-selectable dropdown"
           onClick={this.toggleMenu}
           style={style}
           key={'tag_' + tag.id}>

        {this.state.isDeleting === true &&
          <i className="fa fa-spinner"/>
          }
        {tag.name}

        <ul
          className={"dropdown-menu tag_dropdown_menu tag_dropdown_menu__" + this.props.tag.id }
          aria-labelledby="dLabel">

          <li>
            <Link to="tag" params={ {tagId: tag.id} }>
              <i className="fa fa-link"/>&nbsp;&nbsp;
            </Link>
          </li>

          <li>
            <span onClick={this._onDeleteTag}>
              <i className="fa fa-trash"/>
            </span>
          </li>
        </ul>

      </div>
    );
  }
});

module.exports = TagItem;