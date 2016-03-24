var React = require('react');

var ViewUtils = require('../../../../utils/ViewUtils');

var AddTagColorRow = React.createClass({

  propTypes: {
    color: React.PropTypes.string.isRequired,
    onClicked: React.PropTypes.func.isRequired,
    isSelected: React.PropTypes.bool.isRequired
  },

  _onColorClicked: function () {
    this.props.onClicked(this.props.color);
  },

  render: function ()  {

    var style = {
      background: this.props.color
    };

    var selectedView = (<span className="add_tag_color_list__row__not_selected"/>);

    if (this.props.isSelected) {

      // Setup the check icon color according to the color background.
      var colorClass = "light";
      if (ViewUtils.Colors.isLightColor(this.props.color)) {
        colorClass = "dark";
      }
      selectedView = (
        <span className="add_tag_color_list__row__selected">
          <i className={"fa fa-check-circle " + colorClass}/>
        </span>
      );
    }

    return (
      <span className="add_tag_color_list__row pointer"
            onClick={this._onColorClicked}>
        <span className="add_tag_color_list__row__tag_color vcenter" style={style}>
          {selectedView}
        </span>
      </span>);

  }

});

module.exports = AddTagColorRow;