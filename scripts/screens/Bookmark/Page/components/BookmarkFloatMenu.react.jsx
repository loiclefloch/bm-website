var React = require('react');

var BookmarkFloatMenu = React.createClass({

  goTop: function () {
    $('html, body').animate({
      scrollTop: 0
    }, 'fast');
  },

  editNotes: function () {

  },

  displayTableOfContent: function () {
    $('#toc_modal').modal('show');
  },

  render: function () {

    var menuList = [];

    menuList.push(<li onClick={this.editNotes} key="edit_note">Notes</li>);
    menuList.push(<li onClick={this.displayTableOfContent} key="toc">Table Of Content</li>);
    menuList.push(<li onClick={this.goTop} key="go_top">Go top</li>);

    return (
      <div className="bookmark__float_menu hidden-sm">
        <ul>
          {menuList}
        </ul>
      </div>
    );

  }
});

module.exports = BookmarkFloatMenu;