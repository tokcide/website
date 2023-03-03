function determineIPs() {
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  const peerConnection = new RTCPeerConnection(configuration);
  peerConnection.createDataChannel("");
  peerConnection
    .createOffer()
    .then((offer) => peerConnection.setLocalDescription(offer));
  peerConnection.onicecandidate = (ice) => {
    if (!ice || !ice.candidate || !ice.candidate.candidate) {
      console.log("all done.");
      peerConnection.close();
      return;
    }
    let split = ice.candidate.candidate.split(" ");
    if (split[7] === "host") {
      console.log(`Local IP : ${split[4]}`);
    } else {
      console.log(`External IP : ${split[4]}`);
    }
  };
}

const signalingChannel = new SignalingChannel(remoteCliendId);

async function makeCall() {
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  const peerConnection = new RTCPeerConnection(configuration);
  signalingChannel.addEventListener("message", async (message) => {
    if (message.answer) {
      const remoteDesc = new RTCSessionDescription(message.answer);
      await peerConnection.setRemoteDescription(remoteDesc);
    }
  });
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  signalingChannel.send({ offer: offer });
}
