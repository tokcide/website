export {};

async function makeCall() {
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
  const peerConnection = new RTCPeerConnection(configuration);
}

function sendOffer(pc: RTCPeerConnection, offerOptions?: RTCOfferOptions) {
  let retOffer;
  pc.createOffer(offerOptions).then((offer) => {
    pc.setLocalDescription(offer);
    retOffer = offer;
  });
  return retOffer;
}

function answerOffer(pc: RTCPeerConnection, offer: RTCSessionDescriptionInit) {
  pc.setRemoteDescription(new RTCSessionDescription(offer));
  pc.createAnswer().then(async (answer) => {
    await pc.setLocalDescription(answer);
  });
}

function recieveAnswer(
  pc: RTCPeerConnection,
  answer: RTCSessionDescriptionInit
) {
  const remoteDesc = new RTCSessionDescription(answer);
  pc.setRemoteDescription(remoteDesc).then();
}

function checkConnection(pc: RTCPeerConnection) {
  // Listen for connectionstatechange on the local RTCPeerConnection
  pc.addEventListener("connectionstatechange", (event) => {
    if (pc.connectionState === "connected") {
      // Peers connected!
    }
  });
}

function addStreamTrack(pc: RTCPeerConnection, stream: MediaStream) {
  stream.getTracks().forEach((track) => {
    pc.addTrack(track, stream);
  });
}

function recieveStreamTrack(
  pc: RTCPeerConnection,
  remoteVideo: HTMLVideoElement
) {
  pc.addEventListener("track", async (event) => {
    const [remoteStream] = event.streams;
    remoteVideo.srcObject = remoteStream;
  });
}
