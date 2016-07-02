import React, { PropTypes, Component } from 'react';

import ViewUtils from 'utils/ViewUtils';

export default class AddTagColorRow extends Component {

  static propTypes = {
    color: PropTypes.string.isRequired,
    onClicked: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  };

  onColorClicked = () => {
    this.props.onClicked(this.props.color);
  };

  render() {

    const style = {
      background: this.props.color
    };

    let selectedView = (
      <span className="add_tag_color_list__row__not_selected" />
    );

    if (this.props.isSelected) {
      // Setup the check icon color according to the color background.
      let colorClass = 'light';
      if (ViewUtils.Colors.isLightColor(this.props.color)) {
        colorClass = 'dark';
      }
      selectedView = (
        <span className="add_tag_color_list__row__selected">
          <i className={"fa fa-check-circle " + colorClass} />
        </span>
      );
    }

    return (
      <span
        className="add_tag_color_list__row pointer"
        onClick={this.onColorClicked}
      >
        <span className="add_tag_color_list__row__tag_color vcenter" style={style}>
          {selectedView}
        </span>
      </span>);

  }

}
