export default class PeerConnectionSingleton {
    private static instance: PeerConnectionSingleton;
    public connection: RTCPeerConnection;

    private constructor() {
        this.connection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });
    }

    public static getInstance(): PeerConnectionSingleton {
        if (!PeerConnectionSingleton.instance) {
            PeerConnectionSingleton.instance = new PeerConnectionSingleton();
        }
        return PeerConnectionSingleton.instance;
    }
}