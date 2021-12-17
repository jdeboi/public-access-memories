

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
}, 500);

module.exports = function (client) {
  console.log('client connected...', client.id)
  io.sockets.emit('userJoined', client.id);


  client.on('registerUser', (user, callback) => {
    console.log("REGISTER USER", user)
    if (isUser(user.userName)) {
      console.log("isuser...")
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
    console.log("client socket set", user)
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
    console.log('received error from client:', client.id)
    console.log(err)
  })

  /////////// MESSAGES
  client.on('messageUser', ({ socketId, message, time, avatar }) => {
    console.log("sending to", socketId, "msg:", message);
    io.to(socketId).emit('message', getMessageObject(client.id, socketId, message, time, avatar));
    // client.broadcast.emit('message', getMessageObject(client.id, socketId, message));
    // io.to(socketId).emit('message', getMessageObject(client.id, "private", message));
  })

  client.on('messageRoom', ({ room, message, time, avatar }) => {
    // console.log("sending room message to", room, message);
    // io.sockets.in(room).emit('message', getMessageObject(client.id, "room", message))
    // client.to(room).emit('message', getMessageObject(client.id, room, message));
    client.to(room).emit('message', getMessageObject(client.id, room, message, time, avatar));
  })

  client.on('messageAll', ({ message, time, avatar }) => {
    // includes sender
    // io.emit('message', getMessageObject(client.id, "all", message));

    client.broadcast.emit('message', getMessageObject(client.id, "all", message, time, avatar));
  })

  client.on('critique', (crit) => {
    client.broadcast.emit('critique', crit);
  })
}

function getMessageObject(from, to, msg, time, avatar) {
  return { from: from, to: to, message: msg, time: time, avatar: avatar };
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
