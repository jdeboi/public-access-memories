const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require("http");
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

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});