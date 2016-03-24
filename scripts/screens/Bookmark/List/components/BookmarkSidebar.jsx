var React = require('react');

var BookmarkStore = require('../../../../stores/BookmarkStore.react.jsx');
var Constants = require('../../../../constants/Constants');

var SearchBox = require('./SearchBox.react.jsx');

var BookmarkSidebar = React.createClass({

  propTypes: {
    // -- For SearchBox
    search: React.PropTypes.shape({
      name: React.PropTypes.string
    }).isRequired,
    onSearchSubmit: React.PropTypes.func.isRequired,
    onSearchInput: React.PropTypes.func.isRequired,

    // -- List type
    bookmarkListType: React.PropTypes.number.isRequired,
    onChangeListType: React.PropTypes.func.isRequired
  },

  setSimpleListType: function () {
    this.props.onChangeListType(Constants.View.BookmarkListType.SIMPLE);
  },

  setBlockListType: function () {
    this.props.onChangeListType(Constants.View.BookmarkListType.BLOCK);
  },

  setCompactListType: function () {
    this.props.onChangeListType(Constants.View.BookmarkListType.COMPACT);
  },

  componentDidUpdate: function () {
    // post render
    this.disableCurrentListTypeBtn();
  },

  disableCurrentListTypeBtn: function () {
    // -- disable active button (current bookmark list type)
    $('.bookmark_sidebar__list_type button').prop('disabled', false);

    var classToDisable;

    switch (this.props.bookmarkListType) {
      case Constants.View.BookmarkListType.SIMPLE:
        classToDisable = '.bookmark_sidebar__list_type__simple_btn';
        break;
      case Constants.View.BookmarkListType.BLOCK:
        classToDisable = '.bookmark_sidebar__list_type__block_btn';
        break;
      case Constants.View.BookmarkListType.COMPACT:
        classToDisable = '.bookmark_sidebar__list_type__compact_btn';
        break;
    }
    $(classToDisable).prop('disabled', true);
  },

  render: function () {

    return (
      <div className="sidebar bookmark_sidebar">

        <SearchBox search={this.props.search}
                   onSearchSubmit={this.props.onSearchSubmit}
                   onSearchInput={this.props.onSearchInput}/>

        <div className="top-buffer-50"></div>

        <div className="bookmark_sidebar__list_type row">

          <div className="bookmark_sidebar__list_type__simple_btn_block col-xs-4">
            <button
              className={"bookmark_sidebar__list_type__simple_btn pointer btn "
              + (this.props.bookmarkListType == Constants.View.BookmarkListType.SIMPLE ? "active" : "") }
              onClick={this.setSimpleListType}>

              <img className="bookmark_sidebar__list_type__icon" src="/public/img/icon_list_simple.png"/>

            </button>
          </div>

          <div className="bookmark_sidebar__list_type_block_block col-xs-4">
            <button
              className={"bookmark_sidebar__list_type__block_btn pointer btn "
              +  (this.props.bookmarkListType == Constants.View.BookmarkListType.BLOCK ? "active" : "") }
              onClick={this.setBlockListType}>

              block
            </button>
          </div>


          <div className="bookmark_sidebar__list_type_compact_block col-xs-4">
            <button
              className={"bookmark_sidebar__list_type__compact_btn pointer btn "
              +  (this.props.bookmarkListType == Constants.View.BookmarkListType.COMPACT ? "active" : "") }
              onClick={this.setCompactListType}>

              <img className="bookmark_sidebar__list_type__icon" src="/public/img/icon_list_compact.png"/>

            </button>
          </div>

        </div>
      </div>
    )
      ;
  }

});

module.exports = BookmarkSidebar;