/**
 * See https://github.com/hzdg/react-imageloader/blob/master/src/index.js
 */
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import Logger from 'utils/Logger';

import ViewConstants from 'constants/ViewConstants';

import classNames from 'classnames';

const { span } = React.DOM;

const Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed'
};


export default class ImageLoader extends Component {
  static propTypes = {
    src: PropTypes.string,
    placeholder: PropTypes.string,
    wrapper: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    preloader: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    imgProps: PropTypes.object,
    children: PropTypes.object
  };

  static defaultProps = {
    wrapper: span,
    className: null,
    placeholder: null
  };

  state = {
    status: this.props.src ? Status.LOADING : Status.PENDING
  };

  shouldComponentUpdate(nextProps, newState) {
    return this.props.src !== nextProps.src || this.state.status !== newState.status;
  }

  componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? Status.LOADING : Status.PENDING
      });
    }
  }

  componentDidUpdate() {
    if (this.state.status === Status.LOADING && !this.img) {
      this.createLoader();
    }
  }

  componentWillUnmount() {
    this.destroyLoader();
  }

  get className() {
    return classNames('imageloader', this.state.status, {
      [`${this.props.className}`]: !_.isNull(this.props.className)
    });
  }

  createLoader() {
    this.destroyLoader();  // We can only have one loader at a time.

    this.img = new Image();
    this.img.onload = this.handleLoad;
    this.img.onerror = this.handleError;
    this.img.src = this.props.src;
  }

  destroyLoader() {
    if (this.img) {
      this.img.src = ''; // https://github.com/hzdg/react-imageloader/pull/28/files
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  }

  handleLoad = (event) => {
    this.destroyLoader();
    this.setState({
      status: Status.LOADED
    });

    if (this.props.onLoad) this.props.onLoad(event);
  };

  handleError = (error) => {
    this.destroyLoader();
    this.setState({
      status: Status.FAILED
    });

    Logger.warning('ImageLoader', `Could not load the image with url ${this.props.src}`);
    if (this.props.onError) this.props.onError(error);
  };

  renderImg() {
    const { src, imgProps } = this.props;
    const props = { src };

    for (const k in imgProps) {
      if (imgProps.hasOwnProperty(k)) {
        props[k] = imgProps[k];
      }
    }

    return <img {...props} role="presentation" className={this.props.className} />;
  }

  renderDefaultPreloader() {
    return (
      <div className="image_loader__preloader">
        <i className="fa fa-spinner" />
      </div>
    );
  }

  renderDefaultFailed() {
    return (
      <div
        className="image_loader__failed"
      >
        <i className="fa fa-chain-broken" />
      </div>
    );
  }

  renderPlaceholder() {
    const placeholderImg = this.props.placeholder;

    const className = classNames('image_loader__placeholder', {
      [`${this.props.className}`]: !_.isNull(this.props.className)
    });

    return (
      <img
        className={className}
        role="presentation"
        src={_.isNull(placeholderImg) ? ViewConstants.Image.PLACEHOLDER : placeholderImg}
      />
    );
  }

  render() {
    const wrapperProps = {};

    if (this.props.style) {
      wrapperProps.style = this.props.style;
    }

    const wrapperArgs = [wrapperProps];

    if (_.isNull(this.props.src) || _.isEmpty(this.props.src)) {
      return this.renderPlaceholder();
    }


    switch (this.state.status) {
      case Status.LOADED:
        wrapperArgs.push(this.renderImg());
        break;

      case Status.FAILED:
        if (this.props.children) {
          wrapperArgs.push(this.props.children);
        } else {
          wrapperArgs.push(this.renderDefaultFailed());
        }
        break;

      default:
        if (this.props.preloader) {
          wrapperArgs.push(this.props.preloader());
        } else {
          wrapperArgs.push(this.renderDefaultPreloader());
        }
        break;
    }

    return this.props.wrapper(...wrapperArgs);
  }
}
