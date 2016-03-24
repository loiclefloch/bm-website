var React = require('react');

var AddTagListRow = React.createClass({

  propTypes: {
    isSelected: React.PropTypes.bool.isRequired,
    tag: React.PropTypes.object.isRequired,
    onTagClicked: React.PropTypes.func.isRequired
  },

  onTagClicked: function () {
    this.props.onTagClicked(this.props.tag);
  },

  render: function () {
    var tag = this.props.tag;

    var style = {
      background: tag.color
    };

    // -- Setup selectedView
    var selectedView = (<span className="bookmark__tag_list__add_tag_list__tag_row__not_selected"/>);

    if (this.props.isSelected === true) {
      selectedView = (
        <span className="bookmark__tag_list__add_tag_list__tag_row__selected">
          <i className="fa fa-check"/>
        </span>
      );
    }

    return (
      <div
        className="bookmark__tag_list__add_tag_list__tag_row pointer col-xs-6 col-sm-4 col-md-4 col-lg-3 pointer"
        onClick={this.onTagClicked}
        key={tag.id}>

        <span className="bookmark__tag_list__add_tag_list__tag_row__tag_color vcenter" style={style}/>

        <span className="bookmark__tag_list__add_tag_list__tag_row__tag_name disable-user-select">{tag.name}</span>

        {selectedView}

      </div>
    )
  }

});

module.exports = AddTagListRow;