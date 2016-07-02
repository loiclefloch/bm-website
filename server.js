/* eslint-disable */

const express = require('express');
const path = require('path');

const PORT = 9000;
const environment = process.env.NODE_ENV;

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.all('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT);

console.log('Server is Up and Running at Port : ' + PORT);
console.warn('ENV: ' + environment);
