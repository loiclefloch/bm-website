var React = require('react');

var FontAwesome = require('react-fontawesome');
var _ = require('lodash');

var SlideNavigation = React.createClass({

  propTypes: {
    firstPage: React.PropTypes.number.isRequired,
    lastPage: React.PropTypes.number.isRequired,
    toggleFullScreenMode: React.PropTypes.func.isRequired,
    changeUrl: React.PropTypes.func.isRequired,
    urlQueryParams: React.PropTypes.object.isRequired
  },

  getInitialState: function () {

    // The current slide is the first one or the slide specify in the url (query 'slide')
    var currentPage = !_.isUndefined(this.props.urlQueryParams.slide) ? this.props.urlQueryParams.slide : this.props.firstPage;
    currentPage = parseInt(currentPage);

    return {
      currentPage: currentPage,
      maximumPage: this.props.lastPage
    }
  },

  componentDidUpdate: function () {

    // -- Begin slide
    if ($('.slide').length > 0) {
      var slideToShow = $('.slide_' + this.state.currentPage);

      if (slideToShow.length > 0) {
        slideToShow.show();
      }
      else {
        $('.slide_' + this.props.firstPage).show();
        this.updateCurrentPageNumber(this.props.firstPage);
      }
    }
    // -- End slide

  },

  previous() {
    $('.slide').hide();

    var newPageNb = this.state.currentPage - 1;
    var newSlide = $('.slide_' + newPageNb);

    if (newSlide.length > 0) {
      newSlide.show();
      this.updateCurrentPageNumber(newPageNb);
    }
  },

  next() {
    $('.slide').hide();

    var newPageNb = this.state.currentPage + 1;
    var newSlide = $('.slide_' + newPageNb);

    if (newSlide.length > 0) {
      newSlide.show();
      this.updateCurrentPageNumber(newPageNb);
    }
  },

  updateCurrentPageNumber: function (newPageNb) {

    this.setState({
      currentPage: newPageNb
    });

    this.props.changeUrl({slide: newPageNb});
  },

  render: function () {
    return (
      <div className="slide_navigation text-center">

        <div className="slide_navigation__nav">
          <button className="slide_navigation__previous btn btn-default bold" onClick={this.previous}>
            <FontAwesome name="fa fa-arrow-left"
                         size="1x"
            />
          </button>

          <span className="slide_navigation__paging">
            {this.state.currentPage} / {this.state.maximumPage}
          </span>

          <button className="slide_navigation__next btn btn-default bold" onClick={this.next}>
            <FontAwesome name="fa fa-arrow-right"
                         size="1x"
            />
          </button>
        </div>

        <div className="text-left slide_navigation__fullscreen">
          <button className="btn btn-default bold" onClick={this.props.toggleFullScreenMode}>
            <FontAwesome name="arrows-alt"
                         size="2x"
            />
          </button>
        </div>

      </div>
    )
  }
});

module.exports = SlideNavigation;

