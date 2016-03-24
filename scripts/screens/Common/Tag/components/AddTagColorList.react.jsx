var React = require('react');

var TagUtils = require('../../../../utils/TagUtils');

var AddTagColorRow = require('./AddTagColorRow.react.jsx');

var AddTagColorList = React.createClass({

  propTypes: {
    defaultSelection: React.PropTypes.string.isRequired,
    onColorChosen: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      colors: TagUtils.getDefaultColors()
    }
  },

  render: function () {

    var colorListView = [];

    var _defaultSelection = this.props.defaultSelection;
    var _onColorChosen = this.props.onColorChosen;

    this.state.colors.forEach(function (color) {
      var isSelected = color === _defaultSelection;

      colorListView.push(
        <AddTagColorRow
          color={color}
          isSelected={isSelected}
          onClicked={_onColorChosen}
          key={color}/>
      );
    });

    return (
      <div className="add_tag_color_list">
        {colorListView}
      </div>);
  }

});

module.exports = AddTagColorList;