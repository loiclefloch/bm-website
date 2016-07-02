import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import RoutingEnum from 'constants/RoutingEnum';

const { bool, object, string, func, any } = PropTypes;

const routerShape = PropTypes.shape({
  push: func.isRequired,
  replace: func.isRequired,
  go: func.isRequired,
  goBack: func.isRequired,
  goForward: func.isRequired,
  setRouteLeaveHook: func.isRequired,
  isActive: func.isRequired
});

function isLeftClickEvent(event:Object):Boolean {
  return event.button === 0;
}

function isModifiedEvent(event:Object):Boolean {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function createLocationDescriptor(to:Object, { query, hash, state }):Object {
  if (query || hash || state) {
    return { pathname: to, query, hash, state };
  }

  return to;
}

/**
 * inspired by https://github.com/reactjs/react-router/blob/master/modules/Link.js/**
 *
 * A <Link> is used to create an <a> element that links to a route.
 * When that route is active, the link gets the value of its
 * activeClassName prop.
 *
 * You could use the following component to link to a route:
 *
 *   <Link to={Link.RoutingEnum.DASHBOARD} />
 *
 * or
 *
 *    <Link path="/users" />
 *
 * Links may pass along location state and/or query string parameters
 * in the state/query props, respectively.
 *
 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
 */
class Link extends Component {

  static RoutingEnum: RoutingEnum = RoutingEnum;

  static propTypes = {
    to: object.isRequired,
    query: object,
    hash: string,
    state: object,
    activeStyle: object,
    activeClassName: string,
    onlyActiveOnIndex: bool.isRequired,
    onClick: func,
    target: object,
    className: string,
    style: object,
    children: any
  };

  static defaultProps = {
    onlyActiveOnIndex: false,
    className: '',
    style: {}
  };

  // -- action

  handleClick = (event:Object) => {
    let allowTransition = true;

    if (!_.isUndefined(this.props.onClick)) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      allowTransition = false;
    }

    // If target prop is set (e.g. to "_blank") let browser handle link.
    /* istanbul ignore if: untestable with Karma */
    if (this.props.target) {
      if (!allowTransition) {
        event.preventDefault();
      }
      return;
    }

    event.preventDefault();

    if (allowTransition) {
      const { to, query, hash, state } = this.props;
      const location = createLocationDescriptor(to.path, { query, hash, state });

//      console.log('[LINK]', this, location);
      this.context.router.push(location);
    }
  };

  // -- renderers

  render() {
    const { to, query, hash, state, activeClassName, activeStyle, onlyActiveOnIndex,
      className, params } = this.props;

    const props = {};

    props.className = className;

    // Ignore if rendered outside the context of router, simplifies unit testing.
    const { router } = this.context;

    // console.log(this.context);

    if (router && to) {
      let path = to.path;

      if (!_.isNull(params)) {
        // replace params. On url definition, params start with ':'
        _.forIn(params, (param, key) => {
          path = path.replace(`:${key}`, param);
        });
      }

      const location = createLocationDescriptor(path, { query, hash, state });

      props.href = router.createHref(location);

//     console.log('[LINK]', props.href);

      if (activeClassName || (activeStyle !== null && !_.isEmpty(activeStyle))) {
        if (router.isActive(location, onlyActiveOnIndex)) {
          if (activeClassName) {
            props.className += props.className === '' ? activeClassName : ` ${activeClassName}`;
          }

          if (activeStyle) {
            props.style = _.merge(this.props.style, activeStyle);
          }
        }
      }
    }

    // console.log('[LINK]', props);

    return (
      <a {...props}
        onClick={this.handleClick}
      >
        {this.props.children}
      </a>
    );
  }
}

Link.contextTypes = {
  router: routerShape
};

export default Link;
