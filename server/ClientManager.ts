import { IMessage } from '../client/src/interfaces';

const io = require('./index').io;

var clients = new Map();

// if you open a new tab while logged in,
// there is already a cookie with avatar and username
// so it SETS user (adding entry but bypassing REGISTER)

// TODO: could have it save socket client id with cookie
// so there are separate users per tab

// basically I just need to emit a notice anytime anyone
// joins, regardless of register? that is used a flag

setInterval(() => {
  try {
    const c = Array.from(clients.values());
    // console.log(c.length, "users");
    io.emit('usersUpdate', c);
  }
  catch (error) {
    console.log("nope", error);
  }
}, 300);

module.exports = function (client) {
  // console.log('client connected...', client.id)
  io.sockets.emit('userJoined', client.id);


  client.on('registerUser', (user, callback) => {
    // console.log("REGISTER USER", user)
    if (isUser(user.userName)) {
      // console.log("isuser...")
      callback({ isUser: true, user: user })
    }
    else {
      user.id = client.id;
      clients.set(client.id, user);
      callback({ isUser: false, user: user })
    }
  })

  client.on('disconnect', function () {
    // console.log('client disconnect...', client.id)
    clients.delete(client.id);
    io.sockets.emit('userDisconnected', client.id);
    // handleDisconnect()
  })

  client.on('setUser', user => {
    // console.log("client socket set", user)
    user.id = client.id;
    clients.set(client.id, user);
  })

  client.on('setBot', bot => {
    // console.log("SETTING USER", user)
    clients.set(bot.id, bot);
  })

  client.on('joinRoom', (room) => {
    client.join(room);
    // console.log(client.id, "joined room", room);
  })

  client.on('leaveRoom', (room) => {
    client.leave(room);
    // console.log(client.id, "left room", room);
  })

  client.on('error', (err) => {
    // console.log('received error from client:', client.id)
    console.log(err)
  })

 

  client.on('messageUser', (messageObj: IMessage) => {
    io.to(messageObj.socketId).emit('messageUser', getMessageToUser(messageObj));
  })

  client.on('messageRoom', (messageObj: IMessage) => {
    // console.log("sending room message to", room, message);
    // io.sockets.in(room).emit('message', getMessageObject(client.id, "room", message))
    // client.to(room).emit('message', getMessageObject(client.id, room, message));
    client.to(messageObj.roomUrl).emit('messageRoom', getMessageToRoom(messageObj));
  })

  client.on('messageAll', (messageObj: IMessage) => {
    // includes sender
    // io.emit('message', getMessageObject(client.id, "all", message));

    client.broadcast.emit('messageAll', getMessageToAll(messageObj));
  })

  client.on('critique', (crit) => {
    client.broadcast.emit('critique', crit);
  })
}

 /////////// MESSAGES
  // from: "me",
  // to: userActive.active.userName,
  // socketId: userActive.active.id,
  // roomUrl: user.roomUrl,
  // message: txt,
  // time: JSON.stringify(new Date()),
  // avatar: user.avatar

function getMessageToUser(messageObj: IMessage) {
  // console.log("messageobj", obj);
  const { fromUser, message, time, roomUrl, avatar } = messageObj;
  return { from: fromUser, to: "me", roomUrl, message, time, avatar};
}

function getMessageToRoom(messageObj: IMessage) {
  // console.log("messageobj", obj);
  const { fromUser, roomUrl, message, time, avatar } = messageObj;
  return { from: fromUser, to: "room", roomUrl, message, time, avatar};
}

function getMessageToAll(messageObj: IMessage) {
  // console.log("messageobj", obj);
  const { fromUser, roomUrl, message, time, avatar } = messageObj;
  return { from: fromUser, to: "all", roomUrl, message, time, avatar};
}

function isUser(userName) {

  var reservedUserNames = [
    "everyone",
    "host",
    "room",
    // "jenna",
    "winebot",
    "hostbot",
    "helpbot",
    "dj",
    "djbot"
  ];

  try {
    let values = Array.from(clients.values());
    // console.log("VAL", values);
    const found = values.some(el => el.userName.toLowerCase() === userName.toLowerCase());
    const foundReserved = reservedUserNames.includes(userName.toLowerCase());
    if (found || foundReserved) return true;
    return false;
  }
  catch (error) {
    console.log("issues");
    return false;
  }
}
