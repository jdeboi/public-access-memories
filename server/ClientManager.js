// import { IMessage } from '../client/src/interfaces';

const { reservedArtists, reservedUserNames } = require("./reservedArtists");

const io = require("./index").io;
const clients = require("./index").clients;
const USER_UPDATE_INTERVAL = 100;

// if you open a new tab while logged in,
// there is already a cookie with avatar and username
// so it SETS user (adding entry but bypassing REGISTER)

// TODO: could have it save socket client id with cookie
// so there are separate users per tab

// basically I just need to emit a notice anytime anyone
// joins, regardless of register? that is used a flag

// server
const stablePick = (u) => ({
  id: u.id,
  userName: u.userName,
  roomUrl: u.roomUrl,
  x: u.x,
  y: u.y, // or whatever fields matter
  muted: u.muted,
});

let lastDigest = "";

setInterval(() => {
  try {
    const c = Array.from(clients.values());
    // build a stable, small fingerprint
    const digest = JSON.stringify(
      c.map(stablePick).sort((a, b) => a.id.localeCompare(b.id))
    );
    if (digest !== lastDigest) {
      lastDigest = digest;
      io.emit("usersUpdate", c); // or io.to(room).emit(...) per room
    }
  } catch (err) {
    console.log("error updating users", err);
  }
}, USER_UPDATE_INTERVAL);

module.exports = function (client) {
  io.sockets.emit("userJoined", client.id);

  client.on("registerUser", (user, callback) => {
    if (isUser(user.userName)) {
      callback({ isUser: true, isArtist: false, user: user });
    } else if (isArtist(user.userName)) {
      callback({ isUser: false, isArtist: true, user: user });
    } else {
      user.id = client.id;
      clients.set(client.id, user);
      callback({ isUser: false, user: user });
    }
  });

  client.on("disconnect", function () {
    // console.log('client disconnect...', client.id)
    clients.delete(client.id);
    io.sockets.emit("userDisconnected", client.id);
    // handleDisconnect()
  });

  client.on("setUser", (user) => {
    user.id = client.id;
    clients.set(client.id, user);
  });

  client.on("setBot", (bot) => {
    clients.set(bot.id, bot);
  });

  client.on("joinRoom", (room) => {
    client.join(room);
  });

  client.on("leaveRoom", (room) => {
    client.leave(room);
  });

  client.on("error", (err) => {
    console.log(err);
  });

  client.on("messageUser", (messageObj) => {
    io.to(messageObj.socketId).emit(
      "messageUser",
      getMessageToUser(messageObj)
    );
  });

  client.on("messageRoom", (messageObj) => {
    client
      .to(messageObj.roomUrl)
      .emit("messageRoom", getMessageToRoom(messageObj));
  });

  client.on("messageAll", (messageObj) => {
    client.broadcast.emit("messageAll", getMessageToAll(messageObj));
  });

  client.on("critique", (crit) => {
    client.broadcast.emit("critique", crit);
  });

  client.on("toggleGlobalUserMute", (socketId) => {
    io.to(socketId).emit("toggleGlobalUserMute");
  });
};

/////////// MESSAGES
// from: "me",
// to: userActive.active.userName,
// socketId: userActive.active.id,
// roomUrl: user.roomUrl,
// message: txt,
// time: JSON.stringify(new Date()),
// avatar: user.avatar

function getMessageToUser(messageObj) {
  // console.log("messageobj", obj);
  const { fromUser, message, time, roomUrl, avatar } = messageObj;
  return { from: fromUser, to: "me", roomUrl, message, time, avatar };
}

function getMessageToRoom(messageObj) {
  // console.log("messageobj", obj);
  const { fromUser, roomUrl, message, time, avatar } = messageObj;
  return { from: fromUser, to: "room", roomUrl, message, time, avatar };
}

function getMessageToAll(messageObj) {
  // console.log("messageobj", obj);
  const { fromUser, roomUrl, message, time, avatar } = messageObj;
  return { from: fromUser, to: "all", roomUrl, message, time, avatar };
}

function isUser(userName) {
  try {
    let values = Array.from(clients.values());
    // console.log("VAL", values);
    const found = values.some(
      (el) => el.userName.toLowerCase() === userName.toLowerCase()
    );
    const foundReserved = reservedUserNames.includes(userName.toLowerCase());
    if (found || foundReserved) return true;
    return false;
  } catch (error) {
    console.log("issues");
    return false;
  }
}

function isArtist(userName) {
  try {
    const found = reservedArtists.some(
      (el) => el.toLowerCase() === userName.toLowerCase()
    );
    return found;
  } catch (error) {
    console.log("issues with artist check");
    return false;
  }
}
