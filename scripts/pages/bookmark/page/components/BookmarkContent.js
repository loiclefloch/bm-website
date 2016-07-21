import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

// -- constants
// import ViewConstants from 'constants/ViewConstants';

// -- utils
import classNames from 'classnames';

// -- entities
import Bookmark from 'entities/Bookmark';

// -- views
import HtmlBlock from 'components/HtmlBlock';
import SlideNavigation from './SlideNavigation';
import VideoContent from './VideoContent';

/**
 * Display the bookmark html content.
 */
export default class BookmarkContent extends Component {

  static propTypes = {
    bookmark: PropTypes.objectOf(Bookmark).isRequired,

    changeUrl: PropTypes.func.isRequired,

    urlQueryParams: PropTypes.object.isRequired
  };

  defaultProps = {
    content: '',

    urlQueryParams: {}
  };

  state = {
    fullScreenEnabled: false
  };

  componentDidUpdate() {
    // enable gists
    $('[data-gist-id]').gist();
  //
  //  // -- Begin slide
  //  if ($('.slide').length > 0) {
  //    console.log('slide', $('.slide').length);
  //    $('.slide_1').show();
  //  }
  //  // -- End slide
  //
  }

  toggleFullScreenMode() {
    BM.toggleFullScreen();
    this.setState({
      fullScreenEnabled: !this.state.fullScreenEnabled
    });
  }

  get bookmark():Bookmark {
    return this.props.bookmark;
  }

  renderSlideNavigation() {
    if (this.bookmark.type !== Bookmark.Type.SLIDE) {
      return (null);
    }
    const contentForJquery = $(`<div>${this.bookmark.content}</div>`);

    const firstPage = contentForJquery.find('.slide').first().data('index');
    const lastPage = contentForJquery.find('.slide').last().data('index');

    return (
      <SlideNavigation
        firstPage={firstPage}
        lastPage={lastPage}
        changeUrl={this.props.changeUrl}
        urlQueryParams={this.props.urlQueryParams}
        toggleFullScreenMode={this.toggleFullScreenMode}
      />
    );
  }

  renderVideo() {
    if (this.bookmark.type !== Bookmark.Type.VIDEO) {
      return (null);
    }

    return (
      <VideoContent
        bookmark={this.props.bookmark}
      />
    );
  }

  render() {
    if (_.isEmpty(this.bookmark.content)) {
      return (
        <div className="bookmark__content_empty"></div>
      );
    }

    const blockClasses = classNames('bookmark__content', {
      fullScreen: this.state.fullScreenEnabled,
      bookmark__content_slide: this.bookmark.type === Bookmark.Type.SLIDE,
      bookmark__content_view: this.bookmark.type === Bookmark.Type.VIDEO
    });

    return (
      <div className={blockClasses}>
        {this.renderVideo()}
        <HtmlBlock content={this.bookmark.content} id="bookmark__content_html" />
        {this.renderSlideNavigation()}
      </div>
    );
  }
}
