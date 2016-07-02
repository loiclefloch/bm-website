import React, { Component, PropTypes } from 'react';

class ButtonIcon extends Component {

  static defaultProps = {
    icon: 'fa-plus'
  };

  static propTypes = {

    /**
     * The fa- icon. Ex: 'fa-plus', 'plus'.
     */
    icon: PropTypes.string,

    onClick: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps):boolean {
    return this.props.icon !== nextProps.icon;
  }

  onClick = (event) => {
    event.preventDefault();
    this.props.onClick(event);
  };

  render() {
    let icon = this.props.icon;

    if (!icon.startsWith('fa-')) {
      icon = `fa-${icon}`;
    }

    return (
      <button
        className="btn btn-icon"
        onClick={this.onClick}
      >
        <i className={`fa ${icon}`} />
      </button>
    );
  }

}

export default ButtonIcon;
