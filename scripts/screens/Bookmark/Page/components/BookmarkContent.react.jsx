var React = require('react');

var HtmlBlock = require('../../../Common/HtmlBlock.react.jsx');
var SlideNavigation = require('./SlideNavigation.react.jsx');

var Constants = require('../../../../constants/Constants');

/**
 * Display the bookmark html content.
 */
var BookmarkContent = React.createClass({

  propTypes: {
    content: React.PropTypes.string,
    type: React.PropTypes.number.isRequired,
    changeUrl: React.PropTypes.func.isRequired,
    urlQueryParams: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      fullScreenEnabled: false
    }
  },

  //componentDidUpdate: function () {
  //
  //  // -- Begin slide
  //  if ($('.slide').length > 0) {
  //    console.log('slide', $('.slide').length);
  //    $('.slide_1').show();
  //  }
  //  // -- End slide
  //
  //},

  toggleFullScreenMode: function () {

    BM.toggleFullScreen();

    this.setState({
      fullScreenEnabled: !this.state.fullScreenEnabled
    });

  },

  render: function () {

    if (_.isEmpty(this.props.content)) {
      return (
        <div className="bookmark__content_empty"></div>
      )
    }

    if (this.props.type == Constants.Bookmark.Type.SLIDE) {
      var contentForJquery = $("<div>" + this.props.content + "</div>");

      var firstPage = contentForJquery.find('.slide').first().data('index');
      var lastPage = contentForJquery.find('.slide').last().data('index');

      var slideNavigation = (
        <SlideNavigation firstPage={firstPage}
                         lastPage={lastPage}
                         changeUrl={this.props.changeUrl}
                         urlQueryParams={this.props.urlQueryParams}
                         toggleFullScreenMode={this.toggleFullScreenMode}/>
      );
    }

    var blockClasses = 'bookmark__content';
    if (this.state.fullScreenEnabled == true) {
      blockClasses += ' fullScreen';
    }

    if (this.props.type == Constants.Bookmark.Type.SLIDE) {
      blockClasses += ' bookmark__content_slide';
    }

    return (
      <div className={blockClasses}>
        <HtmlBlock content={this.props.content} id="bookmark__content_html"/>
        {slideNavigation}
      </div>
    )
  }
});

module.exports = BookmarkContent;