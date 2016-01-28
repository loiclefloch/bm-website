var React = require('react');
var router = require('./stores/RouteStore.react.jsx').getRouter();
var RouteStore = require('./stores/RouteStore.react.jsx');

window.React = React;

router.run(function (Handler, state) {
  React.render(<Handler state={state}/>, document.getElementById('content'));
});