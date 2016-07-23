import React, { PropTypes } from 'react';
import moment from 'moment';
import showdown from 'showdown';
import _ from 'lodash';

// -- constants
import Events from 'constants/Events';
import Constants from 'constants/Constants';
import ViewConstants from 'constants/ViewConstants';
import RoutingEnum from 'constants/RoutingEnum';

// -- stores
import TagStore from 'stores/TagStore';
import SessionStore from 'stores/SessionStore';

// -- actions
import TagAction from 'actions/TagAction';
import RouteAction from 'actions/RouteAction';

// -- views;
import AbstractComponent from 'abstracts/AbstractComponent';
import BookmarksTable  from 'components/bookmark/BookmarksTable';
import NoBookmarkForTag from './components/NoBookmarkForTag';


export default class TagPage extends AbstractComponent {

  state = {
    tag: null
  };

  componentDidMount() {
    if (!SessionStore.isLoggedIn()) {
      RouteAction.redirect(RoutingEnum.LOGIN);
    }

    TagStore.addListener(Events.GET_TAG_SUCCESS, this.onChange);
    TagStore.addListener(Events.LOADING, this.hideLoading);

    this.showLoading();
    TagAction.loadTag(this.props.params.tagId);
  }

  componentWillUnmount() {
    TagStore.removeListener(Events.GET_TAG_SUCCESS, this.onChange);
    TagStore.removeListener(Events.LOADING, this.hideLoading);
  }

  onChange = () => {
    this.setState({
      tag: TagStore.getTag()
    });
  };

  onDeleteTag = (e) => {
    e.preventDefault();
    const tag = this.state.tag;
    bootbox.confirm(`Are you sure you want to remove the tag ${tag.name} ?`,
      (result) => {
        if (result == true) {
          this.showLoading();
          TagAction.deleteTag(tag);
        }
      });
  };

  renderBody() {
    const tag = this.state.tag;

    if (_.isNull(tag)) {
      return this.renderOnLoadingContent();
    }

    let bookmarkTable = (null);
    if (_.isNull(tag)) {
      bookmarkTable = this.renderOnLoadingContent();
    } else if (!_.isEmpty(tag.bookmarks)) {
      bookmarkTable = (
        <BookmarksTable
          bookmarks={tag.bookmarks}
          bookmarkListType={ViewConstants.BookmarkListType.SIMPLE}
        />)
      ;
    } else if (this.state.isLoading) {
      bookmarkTable = (<NoBookmarkForTag />);
    }

    const separatorStyle = {
      height: '15px',
      width: '100%',
      background: tag.color
    };

    return (
      <div>
        <div>
          <div className="tag__page_header">
            <h1 className="tag__title">{tag.name}</h1>
          </div>

          <div className="top-buffer-20" style={separatorStyle}></div>

          <div className="tag__action_bar top-buffer-50">
            <a
              href="#"
              onClick={this.onDeleteTag}
            >
              <i className="fa fa-trash" />
            </a>
          </div>
        </div>

        <div className="tag__bookmarks_list top-buffer-50">
          {bookmarkTable}
        </div>

        <div className="clear"></div>
        <div className="top-buffer-50"></div>
      </div>
    );
  }

  render() {
    return (
      <div className="tag_page">
        {this.renderLoading()}
        {this.renderErrorView()}

        {this.renderBody()}
      </div>
    );
  }

}
