import React, { PropTypes, Component } from 'react';

// -- entities
import Bookmark from 'entities/Bookmark';

export default class BookmarkFloatMenu extends Component {

  static propTypes = {
    bookmark: PropTypes.objectOf(Bookmark).isRequired
  };

  onGoTop() {
    $('html, body').animate({
      scrollTop: 0
    }, 'fast');
  }

  onEditNotes() {

  }

  onDisplayTableOfContent() {
    $('#toc_modal').modal('show');
  }

  renderMenuNote() {
    return (
      <li onClick={this.onEditNotes} key="edit_note">
        <i className="fa fa-file-text" />
        Notes
      </li>
    );
  }

  renderMenuToc() {
    return (
      <li onClick={this.onDisplayTableOfContent} key="toc">
        <i className="fa fa-book" />
        Table Of Content
      </li>
    );
  }

  renderMenuGoTop() {
    return (
      <li onClick={this.onGoTop} key="go_top">
        <i className="fa fa-arrow-up" />
        Go top
      </li>
    );
  }

  render() {
    return (
      <div className="bookmark__float_menu hidden-sm">
        <ul>
          {this.renderMenuNote()}
          {this.renderMenuToc()}
          {this.renderMenuGoTop()}
        </ul>
      </div>
    );

  }
}
