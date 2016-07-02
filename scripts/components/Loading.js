import React, { PropTypes, Component } from 'react';

export default class Loading extends Component {

  render() {
    const loading = (<div className="loading__hide"></div>);
    if (this.props.display == true) {

      loading = (
        <div className="loading">
          <div className="loading__screenloading">
            <div className="loading__gif">
              <img src="public/img/loading-bars.svg"/>
            </div>
          </div>
        </div>
      );
    }
    return (loading);
  }
}
