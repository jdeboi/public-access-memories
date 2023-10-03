const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require("http");
const path = require('path');
const server = http.createServer(app);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { AccessToken } = require('livekit-server-sdk');

const createToken = (identity, roomN) => {
    // if this room doesn't exist, it'll be automatically created when the first
    // client joins
    const roomName = roomN;
    // identifier to be used for participant.
    // it's available as LocalParticipant.identity with livekit-client SDK
    const participantName = identity;
    const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_SECRET_KEY, {
        identity: participantName,
    });
    at.addGrant({ roomJoin: true, room: roomName });

    return at.toJwt();
}


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


app.get("/opencallp5", (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/iframes/opencall/opencall.html'));
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/gettoken', (req, res) => {
    const identity = req.query.identity;
    const roomName = req.query.roomName;
    const token = createToken(identity, roomName);
    res.json({token});
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