import React, { PropTypes, Component } from 'react';

// -- constants
import ViewConstants from 'constants/ViewConstants';

// -- utils
import classNames from 'classnames';

// -- entities
import Bookmark from 'entities/Bookmark';

// -- views
import HtmlBlock from 'components/HtmlBlock';
import SlideNavigation from './SlideNavigation';

/**
 * Display the bookmark html content.
 */
export default class BookmarkContent extends Component {

  static propTypes = {
    content: PropTypes.string,

    type: PropTypes.number.isRequired, // See Bookmark.Type

    changeUrl: PropTypes.func.isRequired,

    urlQueryParams: PropTypes.object.isRequired
  };

  defaultProps = {
    content: ''
  };

  state = {
    fullScreenEnabled: false
  };

//componentDidUpdate() {
//
//  // -- Begin slide
//  if ($('.slide').length > 0) {
//    console.log('slide', $('.slide').length);
//    $('.slide_1').show();
//  }
//  // -- End slide
//
//},

  toggleFullScreenMode() {
    BM.toggleFullScreen();
    this.setState({
      fullScreenEnabled: !this.state.fullScreenEnabled
    });
  }

  renderSlideNavigation() {
    if (this.props.type === Bookmark.Type.SLIDE) {
      const contentForJquery = $("<div>" + this.props.content + "</div>");

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

    return (null);
  }

  render() {
    if (_.isEmpty(this.props.content)) {
      return (
        <div className="bookmark__content_empty"></div>
      )
    }

    const blockClasses = classNames('bookmark__content', {
        fullScreen: this.state.fullScreenEnabled,
        bookmark__content_slide: this.props.type === Bookmark.Type.SLIDE
      }
    );

    return (
      <div className={blockClasses}>
        <HtmlBlock content={this.props.content} id="bookmark__content_html" />
        {this.renderSlideNavigation()}
      </div>
    )
  }
}
