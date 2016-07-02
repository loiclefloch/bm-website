import React, { PropTypes, Component } from 'react';

export default class Loading extends Component {

  render() {
    if (this.props.display == true) {

      return (
        <div className="loading">
          <div className="loading__screenloading">
            <div className="loading__gif">
              <img src="public/img/loading-bars.svg"/>
            </div>
          </div>
        </div>
      );
    }
    return (<div className="loading__hide"></div>);
  }
}
