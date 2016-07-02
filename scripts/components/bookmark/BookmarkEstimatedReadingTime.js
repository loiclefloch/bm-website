import React, { PropTypes, Component } from 'react';

export default class BookmarkEstimatedTime extends Component {

  static propTypes = {
    readingTime: PropTypes.any.isRequired
  };

  componentDidUpdate() {
    $('[data-toggle="tooltip-reading-time"]').tooltip();
  }

  componentDidMount() {
    $('[data-toggle="tooltip-reading-time"]').tooltip();
  }

  render() {
    const readingTimeInt = parseInt(this.props.readingTime);
    return (
      <em>
            <span data-toggle="tooltip-reading-time" data-placement="left" title="Estimated reading time">
              <i className="fa fa-clock-o"/>
            </span>
        &nbsp;
        { readingTimeInt == 1
          ? this.props.readingTime + " minute"
          : this.props.readingTime + " minutes"
          }
        &nbsp;</em>
    );
  }

}
