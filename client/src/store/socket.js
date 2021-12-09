import io from "socket.io-client";
let socket = io(process.env.NODE_ENV === 'development'?"http://localhost:8080/":"");
export default socket;
