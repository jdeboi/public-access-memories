const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require("http");
const path = require('path');
const server = http.createServer(app);

// sockets
// var io = module.exports.io = require('socket.io')(server);
// const ClientManager = require('./websockets/ClientManager');
// io.on('connection', ClientManager);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
module.exports.io = io;
const ClientManager = require('./ClientManager');
io.on('connection', ClientManager);


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/../client/build')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
})

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});