import React, { PropTypes, Component } from 'react';

// -- constants
import RoutingEnum from 'constants/RoutingEnum';

// -- views
import Link from 'components/Link';

export default class TagItem extends Component {

  static propTypes = {
    tag: PropTypes.any.isRequired,
    deleteTag: PropTypes.func.isRequired
  };

  state = {
    isOpen: false,
    isDeleting: false
  };

  onDeleteTag = () => {
    this.setState({
      isDeleting: true
    });
    this.props.deleteTag(this.props.tag);
  };

  onToggleMenu = () => {
    $('.tag_dropdown_menu').parent().removeClass('open');

    if (!this.state.isOpen) {
      $(`.tag_dropdown_menu__${this.props.tag.id}`).parent().addClass('open');
    }

    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const tag = this.props.tag;
    const style = {
      background: tag.color
    };

    return (
      <div
        className="bookmark__tag label pointer not-selectable dropdown"
        onClick={this.onToggleMenu}
        style={style}
      >

        {this.state.isDeleting === true &&
        <i className="fa fa-spinner" />
        }
        {tag.name}

        <ul
          className={"dropdown-menu tag_dropdown_menu tag_dropdown_menu__" + this.props.tag.id }
          aria-labelledby="dLabel">

          <li>
            <Link to={RoutingEnum.TAG} params={ {tagId: tag.id} }>
              <i className="fa fa-link" />&nbsp;&nbsp;
            </Link>
          </li>

          <li>
            <span onClick={this.onDeleteTag}>
              <i className="fa fa-trash" />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}
