import React, { PropTypes, Component } from 'react';

export default class BookmarkFloatMenu extends Component {

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
      <li onClick={this.onEditNotes} key="edit_note">Notes</li>
    );
  }

  renderMenuToc() {
    return (
      <li onClick={this.onDisplayTableOfContent} key="toc">Table Of Content</li>
    );
  }

  renderMenuGoTop() {
    return (
      <li onClick={this.onGoTop} key="go_top">Go top</li>
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
