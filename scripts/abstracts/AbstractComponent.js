import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import OnLoadingContentView from 'components/OnLoadingContentView';
import OnLoadingContentViewForModal from 'components/OnLoadingContentViewForModal';

import ViewConstants from 'constants/ViewConstants';

import ErrorView from 'components/mixins/ErrorView';

class AbstractComponent extends Component {

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

  attachErrors(errors) {
    this.setState({
      errors
    });
  }

  renderErrorView() {
    if (!_.isNull(this.state.errors)) {
      return (
        <ErrorNotice errors={this.state.errors}
                     hide={this.hideError}
        />
      );
    }
    return (<div className="error_notice__empty"></div>);
  }

  get apiError() {
    return this.state.apiError;
  }
}

export default AbstractComponent;
