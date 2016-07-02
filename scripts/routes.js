import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Route } from 'react-router';

import Layout from 'pages/Layout';

import RoutingEnum from 'constants/RoutingEnum';

const subRoutes = [];

_.each(RoutingEnum, (route:Route) => {
    if (!route.disable) {
        subRoutes.push(
          <Route
            name={route.name}
            path={route.path}
            component={route.handler}
            key={route.name}
          />
        );
    }
});

const routes = (
  <Route name="app" component={Layout}>
      {subRoutes}
  </Route>
);

export default routes;
