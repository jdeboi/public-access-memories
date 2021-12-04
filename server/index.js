const express = require('express'),
      path    = require('path'),
      route   = require('./route.js'),
      app     = express(),
      port    = process.env.PORT || 8080;

// var io = module.exports.io = require('socket.io')(server);
// const ClientManager = require('./websockets/ClientManager');
// io.on('connection', ClientManager);

app.use(express.static(path.resolve(__dirname, '../client/build')));

route(app);

app.listen(port);

console.log(`API server is listening on port:${port}`);