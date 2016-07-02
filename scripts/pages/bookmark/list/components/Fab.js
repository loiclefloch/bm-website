import React, { PropTypes, Component } from 'react';

export default class Fab extends Component {

  render() {
    return (
      <button className="btn btn-primary btn-fab" id="fab-plus-button">
        <i className="fa fa-plus"/>
      </button>
    )
  }
}
