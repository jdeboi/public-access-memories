
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require("http");
const fs = require('fs');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads
const server = http.createServer(app);

var io = module.exports.io = require('socket.io')(server);
const ClientManager = require('./websockets/ClientManager');
io.on('connection', ClientManager);


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
})


// Choose the port and start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
