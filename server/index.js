const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require("http");
const path = require('path');
const server = http.createServer(app);

const cors = require('cors')
app.use(cors())

const origin = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://www.publicaccessmemories.com/"
console.log("origin:", origin, process.env.NODE_ENV);
const io = require("socket.io")(server, {
    cors: {
        origin: origin,
        methods: ["GET", "POST"]
    }
});
module.exports.io = io;
const ClientManager = require('./ClientManager');
io.on('connection', ClientManager);

app.get("/christina", (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/iframes/christina.html'));
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/../client/build')));


app.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/privacy.html'));
})

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
})

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});