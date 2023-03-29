export default class WebRTC {
  private static PublicStunLinks = {
    hosts:
      "https://raw.githubusercontent.com/pradt2/always-online-stun/master/valid_hosts.txt",
    ipv4s:
      "https://raw.githubusercontent.com/pradt2/always-online-stun/master/valid_ipv4s.txt",
    ipv6s:
      "https://raw.githubusercontent.com/pradt2/always-online-stun/master/valid_ipv6s.txt",
  };
  public peerConnection: RTCPeerConnection;
  constructor() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: this.getStunServers() }],
    });
  }
  getStunServers(): string[] {
    let stunServers: string[] = [];
    fetch(WebRTC.PublicStunLinks.hosts)
      .then((response) => response.text())
      .then((txt) => txt.split("\n"))
      .then((arr) =>
        arr
          .sort(() => 0.5 - Math.random())
          .slice(0, 2)
          .map((value) => "stun:" + decodeURI(value))
      )
      .then((arr) => (stunServers = arr));
    return stunServers;
  }

  setConnectionStateChange(
    v: Map<RTCPeerConnectionState, (event: Event) => void>
  ) {
    this.peerConnection.onconnectionstatechange = (event) => {
      for (const [state, cb] of v.entries()) {
        if (this.peerConnection.connectionState === state) cb(event);
      }
    };
  }

  addLocalStream(v: MediaStream) {
    v.getTracks().forEach((track) => this.peerConnection.addTrack(track, v));
  }
  addRemoteStream(v: MediaStream) {
    this.peerConnection.addEventListener("track", (event) => {
      event.streams[0].getTracks().forEach((track) => v.addTrack(track));
    });
  }

  async createOffer() {
    const offerDescription = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offerDescription);
    return { sdp: offerDescription.sdp, type: offerDescription.type };
  }

  async recieveAnswer(answer: any) {
    const sessionDescription = new RTCSessionDescription(answer);
    await this.peerConnection.setRemoteDescription(sessionDescription);
  }
}
