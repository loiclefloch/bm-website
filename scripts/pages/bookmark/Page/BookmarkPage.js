import React, { PropTypes } from 'react';
import moment from 'moment';
import showdown from 'showdown';
import _ from 'lodash';

// -- utils
import Events from 'constants/Events';
import BookmarkUtils from 'utils/BookmarkUtils';

// -- stores
import BookmarkStore from 'stores/BookmarkStore';
import SessionStore from 'stores/SessionStore';

// -- actions
import BookmarkAction from 'actions/BookmarkAction';
import RouteAction from 'actions/RouteAction';

// -- views
import FontAwesome from 'react-fontawesome';
import AbstractComponent from 'abstracts/AbstractComponent;'
//import Loading from '../../Common/Loading';
import HtmlBlock from 'components/HtmlBlock';
import BookmarkFloatMenu from './components/BookmarkFloatMenu';
import BookmarkTagList from './components/BookmarkTagList';
import BookmarkContent from './components/BookmarkContent';
import TableOfContentPopin from './components/TableOfContentPopin';
import BookmarkEstimatedReadingTime from 'components/Bookmark/BookmarkEstimatedReadingTime';

export default class BookmarkPage extends AbstractComponent {

  state = {
    bookmark: BookmarkStore.getBookmark()
  };

  componentDidMount() {
    this.displayLoading();

    if (!SessionStore.isLoggedIn()) {
      RouteAction.redirect('login');
    }

    BookmarkStore.addListener(Events.CHANGE, this._onChange);
    BookmarkStore.addListener(Events.LOADING, this.hideLoading);
    BookmarkStore.addListener(Events.TAGS_CHANGE_FOR_BOOKMARK, this._onChange);

    BookmarkAction.loadBookmark(this.getParams().bookmarkId);
  }

  componentWillUnmount() {
    BookmarkStore.removeListener(Events.CHANGE, this._onChange);
    BookmarkStore.removeListener(Events.LOADING, this.hideLoading);
    BookmarkStore.removeListener(Events.TAGS_CHANGE_FOR_BOOKMARK, this._onChange);

    BookmarkStore.clearBookmark();
  }

  _onChange = () => {
    this.setState({
      bookmark: BookmarkStore.getBookmark()
    });

    this.handleError(BookmarkStore.getErrors());
  };

  _deleteBookmark = (e) => {
    e.preventDefault();
    const bookmark = this.state.bookmark;
    const self = this;
    bootbox.confirm('Are you sure you want to remove the bookmark "' + BookmarkUtils.getDefaultName(bookmark) + '"?', function(result) {
      if (result == true) {
        self.displayLoading();
        BookmarkAction.deleteBookmark(bookmark);
      }
    });

  };

  _deleteTag = (tag) => {
    BookmarkAction.deleteTagsForBookmark([tag], this.state.bookmark);
  };

  handleChangeUrl(newParams) {
    this.context.router.replaceWith(
      this.context.router.getCurrentPathname(),
      this.props.params, newParams
    );

  }

  render() {
    const bookmark = this.state.bookmark;

    // Convert markdown
    const converter = new showdown.Converter();
    const notesHtml = converter.makeHtml(bookmark.notes);

    return (
      <div id="bookmark" className="row">
        {this.renderLoading()}
        {this.renderErrorView()}

        <BookmarkFloatMenu bookmark={bookmark}/>

        <div className="col-xs-12">
          <div className="bookmark__page_header">
            <h1 className="bookmark__title">{BookmarkUtils.getDefaultName(bookmark)}</h1>
          </div>

          <div className="bookmark__action_bar">

            <BookmarkEstimatedReadingTime readingTime={bookmark.reading_time}/>

            <span type="button" className="btn btn-primary" onClick={this._deleteBookmark}>

              <FontAwesome name="trash-o"
                           size="2x"
                           style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              />

            </span>
          </div>
        </div>

        <div className="col-xs-12">

          { bookmark.preview_picture &&
          <div className="bookmark__preview_picture">
            <img src={bookmark.preview_picture} className="bookmark__preview_picture__img"/>
          </div>}

          { bookmark.description &&
          <div>
            <hr />
            <p>{bookmark.description}</p>
          </div>}

          <div className="top-buffer-30">
            <BookmarkTagList bookmark={bookmark} deleteTag={this._deleteTag}/>
          </div>

          <div className="top-buffer-30">
            { bookmark.icon &&
            <div className="bookmark__icon"><img src={bookmark.icon}/></div>
            }
            { !bookmark.icon &&
            <div className="bookmarks__item_no_icon"></div>
            }

            <a href={bookmark.url} target="_blank">
              {BookmarkUtils.getPrettyUrl(bookmark.url)}
            </a>
          </div>

          { bookmark.notes &&
          <div>
            <hr />
            <div dangerouslySetInnerHTML={{__html: notesHtml}}></div>
          </div>}

          <hr />

        </div>

        <div className="col-xs-12">
          <BookmarkContent content={bookmark.content}
                           type={bookmark.type}
                           urlQueryParams={this.props.query}
                           changeUrl={this.handleChangeUrl}/>
        </div>

        <div className="col-xs-12 top-buffer-50"></div>

        <div>
          <TableOfContentPopin bookmark={bookmark}/>
        </div>
      </div>

    );
  }

}
