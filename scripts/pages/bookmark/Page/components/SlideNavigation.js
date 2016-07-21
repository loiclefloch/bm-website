import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

// -- views
import FontAwesome from 'react-fontawesome';

export default class SlideNavigation extends Component {

  static propTypes = {
    firstPage: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    toggleFullScreenMode: PropTypes.func.isRequired,
    changeUrl: PropTypes.func.isRequired,
    urlQueryParams: PropTypes.object.isRequired
  };

  state = {
    // The current slide is the first one or the slide specify in the url (query 'slide')
    currentPage: parseInt(!_.isUndefined(this.props.urlQueryParams.slide) ? this.props.urlQueryParams.slide : this.props.firstPage),
    maximumPage: this.props.lastPage
  };

  componentDidUpdate() {
    // -- Begin slide
    if ($('.slide').length > 0) {
      const slideToShow = $(`.slide_${this.state.currentPage}`);

      if (slideToShow.length > 0) {
        slideToShow.show();
      } else {
        $(`.slide_${this.props.firstPage}`).show();
        this.updateCurrentPageNumber(this.props.firstPage);
      }
    }
    // -- End slide
  }

  onPrevious = () => {
    $('.slide').hide();

    const newPageNb = this.state.currentPage - 1;
    const newSlide = $(`.slide_${newPageNb}`);

    if (newSlide.length > 0) {
      newSlide.show();
      this.updateCurrentPageNumber(newPageNb);
    }
  };

  onNext = () => {
    $('.slide').hide();

    const newPageNb = this.state.currentPage + 1;
    const newSlide = $(`.slide_${newPageNb}`);

    if (newSlide.length > 0) {
      newSlide.show();
      this.updateCurrentPageNumber(newPageNb);
    }
  };

  updateCurrentPageNumber = (newPageNb) => {
    this.setState({
      currentPage: newPageNb
    });

    this.props.changeUrl({ slide: newPageNb });
  };

  render() {
    return (
      <div className="slide_navigation text-center">

        <div className="slide_navigation__nav">
          <button
            className="slide_navigation__previous btn btn-default bold"
            onClick={this.onPrevious}
          >
            <FontAwesome
              name="fa fa-arrow-left"
              size="1x"
            />
          </button>

          <span className="slide_navigation__paging">
            {this.state.currentPage} / {this.state.maximumPage}
          </span>

          <button className="slide_navigation__next btn btn-default bold" onClick={this.onNext}>
            <FontAwesome
              name="fa fa-arrow-right"
              size="1x"
            />
          </button>
        </div>

        <div className="text-left slide_navigation__fullscreen">
          <button className="btn btn-default bold" onClick={this.props.toggleFullScreenMode}>
            <FontAwesome
              name="arrows-alt"
              size="2x"
            />
          </button>
        </div>
      </div>
    );
  }
}
