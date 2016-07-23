import React, { PropTypes } from 'react';
import moment from 'moment';
import showdown from 'showdown';
import _ from 'lodash';

// -- constants
import RoutingEnum from 'constants/RoutingEnum';
import Events from 'constants/Events';

// -- stores
import BookmarkStore from 'stores/BookmarkStore';
import SessionStore from 'stores/SessionStore';

// -- actions
import BookmarkAction from 'actions/BookmarkAction';
import RouteAction from 'actions/RouteAction';

// -- entities
import Bookmark from 'entities/Bookmark';

// -- views
import FontAwesome from 'react-fontawesome';
import AbstractComponent from 'abstracts/AbstractComponent';
import BookmarkFloatMenu from './components/BookmarkFloatMenu';
import BookmarkTagList from 'components/tag/BookmarkTagList';
import BookmarkContent from './components/BookmarkContent';
import TableOfContentPopin from './components/TableOfContentPopin';
import BookmarkEstimatedReadingTime from 'components/bookmark/BookmarkEstimatedReadingTime';
import NotesEditor from './components/NotesEditor';
import ImageLoader from 'components/ImageLoader';

export default class BookmarkPage extends AbstractComponent {

  state = {
    bookmark: BookmarkStore.getBookmark(),
    displayEditNotes: false
  };

  componentDidMount() {
    this.showLoading();

    if (!SessionStore.isLoggedIn()) {
      RouteAction.redirect(RoutingEnum.LOGIN);
    }

    BookmarkStore.addListener(Events.GET_BOOKMARK_SUCCESS, this.onBookmarkChange);
    BookmarkStore.addListener(Events.UPDATE_BOOKMARK_SUCCESS, this.onBookmarkChange);

    BookmarkStore.addListener(Events.LOADING, this.hideLoading);

    BookmarkStore.addListener(Events.ON_SHOW_BOOKMARK_NOTES_EDITOR, this.onShowBookmarkNotesEditor);
    BookmarkStore.addListener(Events.ON_HIDE_BOOKMARK_NOTES_EDITOR, this.onHideBookmarkNotesEditor);

    BookmarkAction.loadBookmark(this.props.params.bookmarkId);
  }

  componentWillUnmount() {
    BookmarkStore.removeListener(Events.GET_BOOKMARK_SUCCESS, this.onBookmarkChange);
    BookmarkStore.removeListener(Events.UPDATE_BOOKMARK_SUCCESS, this.onBookmarkChange);

    BookmarkStore.removeListener(Events.LOADING, this.hideLoading);

    BookmarkStore.removeListener(Events.ON_SHOW_BOOKMARK_NOTES_EDITOR,
       this.onShowBookmarkNotesEditor
    );

    BookmarkStore.removeListener(Events.ON_HIDE_BOOKMARK_NOTES_EDITOR,
       this.onHideBookmarkNotesEditor
    );
  }

  // -- events functions

  onBookmarkChange = () => {
    this.setState({
      bookmark: BookmarkStore.getBookmark()
    });

    this.handleError(BookmarkStore.getError());
  };

  onDeleteBookmark = (e) => {
    e.preventDefault();
    const bookmark:Bookmark = this.state.bookmark;
    const self = this;
    bootbox.confirm('Are you sure you want to remove the bookmark "' + bookmark.getDefaultName() + '"?', function(result) {
      if (result == true) {
        self.showLoading();
        BookmarkAction.deleteBookmark(bookmark);
      }
    });
  };

  onDeleteTag = (tag) => {
    BookmarkAction.deleteTagsForBookmark([tag], this.state.bookmark);
  };

  onShowBookmarkNotesEditor = () => {
    this.setState({
      displayEditNotes: true
    });
  };

  onHideBookmarkNotesEditor = () => {
    this.setState({
      displayEditNotes: false
    });
  };

  // -- renderers

  renderBody() {
    const bookmark = this.state.bookmark;

    if (_.isNull(bookmark)) {
      return this.renderOnLoadingContent();
    }

    // Convert markdown
    const converter = new showdown.Converter();
    const notesHtml = converter.makeHtml(bookmark.notes);

    return (
      <div>

        <BookmarkFloatMenu
          bookmark={bookmark}
        />

        <div className="col-xs-12">
          <div className="bookmark__page_header">
            <h1 className="bookmark__title">{bookmark.getDefaultName()}</h1>
          </div>

          <div className="bookmark__action_bar">

            <BookmarkEstimatedReadingTime readingTime={bookmark.reading_time} />

            <span type="button" className="btn btn-primary" onClick={this.onDeleteBookmark}>
              <FontAwesome
                name="trash-o"
                size="2x"
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              />
            </span>
          </div>
        </div>

        <div className="col-xs-12">
          {bookmark.preview_picture &&
            <div className="bookmark__preview_picture">
              <ImageLoader
                src={bookmark.preview_picture}
                className="bookmark__preview_picture__img"
              />
            </div>}

          {bookmark.description &&
            <div>
              <hr />
              <p>{bookmark.description}</p>
            </div>}

          <div className="top-buffer-30">
            <BookmarkTagList bookmark={bookmark} deleteTag={this.onDeleteTag} />
          </div>

          <div className="top-buffer-30">
            {bookmark.icon &&
              <div className="bookmark__icon">
                <ImageLoader src={bookmark.icon} />
              </div>
            }
            {!bookmark.icon &&
              <div className="bookmarks__item_no_icon"></div>
            }

            <a href={bookmark.url} target="_blank">
              {bookmark.getPrettyUrl()}
            </a>
          </div>

          {bookmark.notes &&
            <div>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: notesHtml }}></div>
            </div>
          }

          <hr />

        </div>

        <div className="col-xs-12">
          <BookmarkContent
            bookmark={bookmark}
            urlQueryParams={this.props.location.query}
            changeUrl={this.onChangeQueryUrl}
          />
        </div>

        <div className="col-xs-12 top-buffer-50"></div>

        <div>
          <TableOfContentPopin bookmark={bookmark} />
        </div>
      </div>

    );
  }

  renderNotesEditor() {
    if (this.state.displayEditNotes) {
      return (
        <NotesEditor
          bookmark={this.state.bookmark}
          onClose={this.onHideEditNotes}
        />
      );
    }

    return (null);
  }

  render() {
    return (
      <div id="bookmark" className="row">
        {this.renderLoading()}
        {this.renderErrorView()}
        {this.renderBody()}
        {this.renderNotesEditor()}
      </div>
    );
  }

}
