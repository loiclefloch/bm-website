import React, { PropTypes, Component } from 'react';

import TagUtils from 'utils/TagUtils';

import AddTagColorRow from './AddTagColorRow';

export default class AddTagColorList extends Component {

  static propTypes = {
    defaultSelection: PropTypes.string.isRequired,
    onColorChosen: PropTypes.func.isRequired
  };

  state = {
    colors: TagUtils.getDefaultColors()
  };

  render() {
    const colorListView = [];

    const _defaultSelection = this.props.defaultSelection;
    const _onColorChosen = this.props.onColorChosen;

    this.state.colors.forEach(function(color) {
      const isSelected = color === _defaultSelection;

      colorListView.push(
        <AddTagColorRow
          color={color}
          isSelected={isSelected}
          onClicked={_onColorChosen}
          key={color} />
      );
    });

    return (
      <div className="add_tag_color_list">
        {colorListView}
      </div>);
  }

}
