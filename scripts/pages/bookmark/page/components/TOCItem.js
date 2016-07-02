import React, { PropTypes, Component } from 'react';

export  default class TOCItem extends Component {

  static propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired
  };

  render() {
    return (
      <li className={this.props.level}>
        <a href={this.props.link}> {this.props.title} </a>
      </li>
    )
  }
}
