const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require("http");
const path = require('path');
const twilio = require('twilio');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const clients = new Map();
module.exports.clients = clients;
const maxParticipants = 43 + 5; // Set the maximum allowed participants

app.use(bodyParser.json());

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

async function muteUserAudio(participantSID) {
    const participant = await roomService.getParticipant(participantSID);
    for (let track of participant.tracks) {
        if (track.kind === 'audio') {
            await roomService.muteTrack(track.sid);
        }
    }
}

// Unmute a user's audio track
async function unmuteUserAudio(participantSID) {
    const participant = await roomService.getParticipant(participantSID);
    for (let track of participant.tracks) {
        if (track.kind === 'audio') {
            await roomService.unmuteTrack(track.sid);
        }
    }
}

const cors = require('cors')
app.use(cors())

const origin = process.env.NODE_ENV != "production" ? "http://localhost:3000" : "https://www.publicaccessmemories.com/"
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

app.post('/api/muteUser', async (req, res) => {
    const participantSID = req.body.participantSID;

    try {
        await muteUserAudio(participantSID);
        res.send({ success: true });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

app.post('/api/unmuteUser', async (req, res) => {
    const participantSID = req.body.participantSID;

    try {
        await unmuteUserAudio(participantSID);
        res.send({ success: true });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

app.post('/api/verify-password', (req, res) => {
    // const identity = req.body.identity;
    if (req.body.password === process.env.ADMIN_PASSWORD) {
        // do I need username?
        const token = jwt.sign({ username: "admin" }, process.env.ADMIN_SECRET, { expiresIn: '5d' });

        res.json({ isValid: true, token });
    } else {
        res.json({ isValid: false });
    }
});

app.post('/get-livekit-token', (req, res) => {
    const identity = req.body.identity;
    const roomName = req.body.roomName;

    try {
        const token = createToken(identity, roomName);
        res.json({ isValid: true, token });
    }
    catch (err) {
        res.json({ isValid: false });
    }

});

app.post('/api/get-twilio-token', (req, res) => {
    const identity = req.body.identity;

    if (clients.size < maxParticipants) {

        const options = { identity }
        const token = new twilio.jwt.AccessToken(process.env.TWILIO_SID, process.env.TWILIO_KEY, process.env.TWILIO_SECRET, options);


        const grant = new twilio.jwt.AccessToken.VideoGrant();
        token.addGrant(grant);


        res.json({ entered: true, token: token.toJwt() });
    }
    else
        res.json({ entered: false })
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