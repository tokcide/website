// import { createClient } from "@redis/client";
export { LocalConnectionResolver, RemoteConnectionResolver };

abstract class ConnectionResolver {
  static readonly configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
  protected pc: RTCPeerConnection = new RTCPeerConnection(
    ConnectionResolver.configuration
  );
  constructor(cb: () => {}) {
    // Listen for connectionstatechange on the local RTCPeerConnection
    this.pc.addEventListener("connectionstatechange", (event) => {
      if (this.pc.connectionState === "connected") {
        cb();
        // return true;
      }
    });
  }
}

class LocalConnectionResolver extends ConnectionResolver {
  async dispatchOffer(offerOptions?: RTCOfferOptions): Promise<string> {
    const offer = await this.pc.createOffer(offerOptions);
    this.pc.setLocalDescription(offer);
    return JSON.stringify(offer);
  }

  async recieveAnswer(answer: string): Promise<void> {
    const remoteDesc = new RTCSessionDescription(JSON.parse(answer));
    return await this.pc.setRemoteDescription(remoteDesc);
  }

  addStreamTrack(stream: MediaStream): void {
    stream.getTracks().forEach((track) => {
      this.pc.addTrack(track, stream);
    });
  }
}
class RemoteConnectionResolver extends ConnectionResolver {
  async answerOffer(offer: string): Promise<string> {
    const remoteDesc = new RTCSessionDescription(JSON.parse(offer));
    await this.pc.setRemoteDescription(remoteDesc);
    const answer = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answer);
    return JSON.stringify(answer);
  }

  recieveStreamTrack(remoteVideo: HTMLVideoElement) {
    this.pc.addEventListener("track", async (event) => {
      const [remoteStream] = event.streams;
      remoteVideo.srcObject = remoteStream;
    });
  }
}
