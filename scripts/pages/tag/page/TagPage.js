import React, { PropTypes } from 'react';
import moment from 'moment';
import showdown from 'showdown';
import _ from 'lodash';

import Constants from 'constants/Constants';
import Api from 'utils/Api';
import TagStore from 'stores/TagStore';
import SessionStore from 'stores/SessionStore';

import Events from 'constants/Events';

import TagAction from 'actions/TagAction';
import RouteAction from 'actions/RouteAction';

// -- views;
import AbstractComponent from 'abstracts/AbstractComponent';
import BookmarksTable  from 'components/bookmark/BookmarksTable';
import NoBookmarkForTag from './components/NoBookmarkForTag';


export default class TagPage extends AbstractComponent {

  state = {
    tag: TagStore.getTag()
  };

  componentDidMount() {
    if (!SessionStore.isLoggedIn()) {
      RouteAction.redirect('login');
    }

    TagStore.addListener(Events.CHANGE, this._onChange);
    TagStore.addListener(Events.LOADING, this.hideLoading);

    this.showLoading();
    TagAction.loadTag(this.getParams().tagId);
  }

  componentWillUnmount() {
    TagStore.removeListener(Events.CHANGE, this._onChange);
    TagStore.removeListener(Events.LOADING, this.hideLoading);
    TagStore.clearTag();
  }

  _onChange() {
    this.setState({
      tag: TagStore.getTag()
    });

    this.handleError(TagStore.getErrors());
  }

  _deleteTag(e) {
    e.preventDefault();
    const tag = this.state.tag;
    const self = this;
    bootbox.confirm("Are you sure you want to remove the tag " + tag.name + "?", function(result) {
      if (result == true) {
        self.showLoading();
        Api.deleteTag(tag.id);
      }
    });

  }

  render() {
    const tag = this.state.tag;

    let bookmarkTable = (null);
    if (_.isNull(tag)) {
      bookmarkTable = this.renderOnLoadingContent();
    } else if (!_.isEmpty(tag.bookmarks)) {
      bookmarkTable = (<BookmarksTable bookmarks={tag.bookmarks}
                                       bookmarkListType={ViewConstants.BookmarkListType.SIMPLE} />);
    }
    else if (this.state.isLoading) {
      bookmarkTable = (<NoBookmarkForTag />);
    }

    const separatorStyle = {
      "height": '15px',
      "width": '100%',
      "background": tag.color
    };

    return (
      <div id="tag">
        {this.renderLoading()}
        {this.renderErrorView()}

        <div>
          <div className="tag__page_header">
            <h1 className="tag__title">{tag.name}</h1>
          </div>

          <div className="top-buffer-20" style={separatorStyle}></div>

          <div className="tag__action_bar top-buffer-50">
            <a href="#" onClick={this._deleteTag}>
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

}
