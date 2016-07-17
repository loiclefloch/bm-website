import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import OnLoadingContentView from 'components/OnLoadingContentView';
import OnLoadingContentViewForModal from 'components/OnLoadingContentViewForModal';

import ViewConstants from 'constants/ViewConstants';

// -- views
import ErrorNotice from 'components/ErrorNotice';

class AbstractComponent extends Component {

  state = {};

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  // ---- Loading

  showLoading = () => {
    this.setState({
      loading: true
    });
  };

  hideLoading = () => {
    this.setState({
      loading: false
    });
  };

  isLoading() {
    return !_.isUndefined(this.state.loading) && this.state.loading;
  }

  renderLoading() {
    if (_.isNull(this.state) || _.isUndefined(this.state.loading) || this.state.loading === false) {
      return (<div className="page_loading_hide"></div>);
    }
    return (
      <div className="page_loading_show">
        <div className="page_loading_show__gif">
          <img
            src={ViewConstants.Image.LOADING_BAR}
            role="presentation"
          />
        </div>
      </div>
    );
  }

  renderOnLoadingContent() {
    return (
      <OnLoadingContentView
        displayMessage={!this.isLoading()}
      />
    );
  }

  renderOnLoadingContentForModal() {
    return (
      <OnLoadingContentViewForModal />
    );
  }

  // -- notifications.

  handleError(errors) {
    this.setState({
      errors
    });
  }

  onHide = () => {

  };

  renderErrorView() {
    if (!_.isNull(this.state.errors)) {
      return (
        <ErrorNotice
          errors={this.state.errors}
          onHide={this.onHideError}
        />
      );
    }
    return (<div className="error_notice__empty"></div>);
  }

  get apiError() {
    return this.state.apiError;
  }


  // -- url
  onChangeQueryUrl = (newQueryParams) => {
    const routeName = _.last(this.props.routes).name;
    const params = this.props.routeParams;
    let query = this.props.location.query;

    query = Object.assign({}, query, newQueryParams);

    this.context.router.replace({ pathname: this.props.location.pathname, query });
  };

}

export default AbstractComponent;
