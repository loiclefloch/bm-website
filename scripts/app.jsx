var React = require('react');
var router = require('./stores/RouteStore.react.jsx').getRouter();
var RouteStore = require('./stores/RouteStore.react.jsx');
var ReactDOM = require("react-dom");

window.React = React;

router.run(function (Handler, state) {
  ReactDOM.render(<Handler state={state}/>, document.getElementById('content'));
});