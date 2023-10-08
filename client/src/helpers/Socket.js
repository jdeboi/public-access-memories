import io from "socket.io-client";
let socket = io(process.env.NODE_ENV !== 'production'?"http://localhost:3001/":"");
export default socket;
