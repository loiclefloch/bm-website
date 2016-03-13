var React = require('react');

var FontAwesome = require('react-fontawesome');

var SlideNavigation = React.createClass({

  propTypes: {
    firstPage: React.PropTypes.number.isRequired,
    lastPage: React.PropTypes.number.isRequired,
    toggleFullScreenMode: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      currentPage: this.props.firstPage,
      maximumPage: this.props.lastPage
    }
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
  },

  render: function () {
    return (
      <div className="slide_navigation row">

        <div className="text-center col-xs-11">
          <button className="slide_navigation__previous btn btn-default bold" onClick={this.previous}>Previous</button>
          <span className="slide_navigation__paging">{this.state.currentPage} / {this.state.maximumPage}</span>
          <button className="slide_navigation__next btn btn-default bold" onClick={this.next}>Next</button>
        </div>

        <div className="text-left col-xs-1">
          <button className="slide_navigation__next btn btn-default bold" onClick={this.props.toggleFullScreenMode}>
            <FontAwesome name="arrows-alt"
                         size="2x"
                         style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </button>
        </div>

      </div>
    )
  }
});

module.exports = SlideNavigation;

