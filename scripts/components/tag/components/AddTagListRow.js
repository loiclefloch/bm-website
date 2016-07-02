import React, { PropTypes } from 'react';

const AddTagListRow extends Component {

  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    tag: PropTypes.object.isRequired,
    onTagClicked: PropTypes.func.isRequired
  },

  onTagClicked() {
    this.props.onTagClicked(this.props.tag);
  },

  render() {
    const tag = this.props.tag;

    const style = {
      background: tag.color
    };

    // -- Setup selectedView
    const selectedView = (<span className="bookmark__tag_list__add_tag_list__tag_row__not_selected"/>);

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