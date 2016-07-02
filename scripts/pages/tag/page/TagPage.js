import React, { PropTypes } from 'react';
import moment from 'moment';
import showdown from 'showdown';
import _ from 'lodash';

// -- constants
import Events from 'constants/Events';
import Constants from 'constants/Constants';
import ViewConstants from 'constants/ViewConstants';

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
    tag: TagStore.getTag()
  };

  componentDidMount() {
    if (!SessionStore.isLoggedIn()) {
      RouteAction.redirect('login');
    }

    TagStore.addListener(Events.ON_LOADING_TAG, this.onChange);
    TagStore.addListener(Events.LOADING, this.hideLoading);

    this.showLoading();
    TagAction.loadTag(this.props.params.tagId);
  }

  componentWillUnmount() {
    TagStore.removeListener(Events.ON_LOADING_TAG, this.onChange);
    TagStore.removeListener(Events.LOADING, this.hideLoading);
//    TagStore.clearTag();
  }

  onChange = () => {
    this.setState({
      tag: TagStore.getTag()
    });
  }

  deleteTag = (e) => {
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
