import io from "socket.io-client";
let socket = io(process.env.NODE_ENV === 'development'?"http://localhost:3001/":"");
export default socket;

// const io = require("socket.io-client");
// const socket = io(process.env.NODE_ENV === 'development'?"http://localhost:3001/":"", {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }
// });
// export default socket;