/* eslint-disable */
const express = require('express');
const serveStatic = require("serve-static");
const path = require('path');
const history = require('connect-history-api-fallback');

var app = express();
app.use(history());
app.use(serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 8080;
app.listen(port);

console.log('server started '+ port);