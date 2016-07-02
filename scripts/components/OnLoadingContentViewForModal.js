import React, { Component, PropTypes } from 'react';

/**
 * Display a loading message where the content will be place after
 * the data is retrieve from the API.
 *
 * Example:
 *
 * state = {
 *  dataFromApi: null
 * }
 *
 * render() {
 *  const contentView = (null);
 *   // the default value of the dataFromApi is null.
 *  if (_.isNull(this.state.dataFromApi)) {
 *    contentView = (
 *      <OnLoadingContentViewForModal />
 *    );
 *  }
 *  else {
 *   // do stuff
 *  }
 *
 *  return (
 *    ...
 *    {contentView}
 *    ...
 *  )
 * }
 */
class OnLoadingContentViewForModal extends Component {

  static propTypes = {
    /**
     * Should we display a loading message ?
     */
    displayMessage: PropTypes.bool
  };

  static defaultProps = {
    displayMessage: true
  };

  render() {
    let message = (
      <i className="fa fa-spinner" />
    );

    if (this.props.displayMessage === false) {
      message = (null);
    }

    return (
      <div className="on_loading_content_view_for_modal text-center">
        {message}
      </div>
    );
  }
}

export default OnLoadingContentViewForModal;
