import React, { PropTypes, Component } from 'react';

// -- stores
import BookmarkStore from 'stores/BookmarkStore';

// -- constants
import ViewConstants from 'constants/ViewConstants';

// -- views
import SearchBox from './SearchBox';

export default class BookmarkSidebar extends Component {

  static propTypes = {
    // -- For SearchBox
    search: PropTypes.shape({
      name: PropTypes.string
    }).isRequired,
    onSearchSubmit: PropTypes.func.isRequired,
    onSearchInput: PropTypes.func.isRequired,

    // -- List type
    bookmarkListType: PropTypes.number.isRequired,

    onChangeListType: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    // post render
    this.disableCurrentListTypeBtn();
  }

  onSetSimpleListType = () => {
    this.props.onChangeListType(ViewConstants.BookmarkListType.SIMPLE);
  };

  onSetBlockListType = () => {
    this.props.onChangeListType(ViewConstants.BookmarkListType.BLOCK);
  };

  onSetCompactListType = () => {
    this.props.onChangeListType(ViewConstants.BookmarkListType.COMPACT);
  };


  disableCurrentListTypeBtn() {
    // -- disable active button (current bookmark list type)
    $('.bookmark_sidebar__list_type button').prop('disabled', false);

    let classToDisable;

    switch (this.props.bookmarkListType) {
      case ViewConstants.BookmarkListType.SIMPLE:
        classToDisable = '.bookmark_sidebar__list_type__simple_btn';
        break;
      case ViewConstants.BookmarkListType.BLOCK:
        classToDisable = '.bookmark_sidebar__list_type__block_btn';
        break;
      case ViewConstants.BookmarkListType.COMPACT:
        classToDisable = '.bookmark_sidebar__list_type__compact_btn';
        break;
    }
    $(classToDisable).prop('disabled', true);
  }

  render() {
    return (
      <div className="sidebar bookmark_sidebar">

        <SearchBox search={this.props.search}
                   onSearchSubmit={this.props.onSearchSubmit}
                   onSearchInput={this.props.onSearchInput} />

        <div className="top-buffer-50"></div>

        <div className="bookmark_sidebar__list_type row">

          <div className="bookmark_sidebar__list_type__simple_btn_block col-xs-4">
            <button
              className={"bookmark_sidebar__list_type__simple_btn pointer btn "
              + (this.props.bookmarkListType === ViewConstants.BookmarkListType.SIMPLE ? "active" : "") }
              onClick={this.onSetSimpleListType}>

              <img className="bookmark_sidebar__list_type__icon"
                   src="/public/img/icon_list_simple.png" />

            </button>
          </div>

          <div className="bookmark_sidebar__list_type_block_block col-xs-4">
            <button
              className={"bookmark_sidebar__list_type__block_btn pointer btn "
              +  (this.props.bookmarkListType == ViewConstants.BookmarkListType.BLOCK ? "active" : "") }
              onClick={this.onSetBlockListType}>

              block
            </button>
          </div>


          <div className="bookmark_sidebar__list_type_compact_block col-xs-4">
            <button
              className={"bookmark_sidebar__list_type__compact_btn pointer btn "
              +  (this.props.bookmarkListType == ViewConstants.BookmarkListType.COMPACT ? "active" : "") }
              onClick={this.onSetCompactListType}>

              <img className="bookmark_sidebar__list_type__icon"
                   src="/public/img/icon_list_compact.png" />

            </button>
          </div>

        </div>
      </div>
    );
  }

}
