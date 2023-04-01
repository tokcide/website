import type { RealtimeChannel } from "@supabase/supabase-js";

export {};
let callDoc: RealtimeChannel;

const pc = new RTCPeerConnection();
caller: {
  pc.onicecandidate = (event) =>
    event.candidate &&
    callDoc.send({
      type: "broadcast",
      event: "ice",
      payload: { user: "userserserser", data: event.candidate.toJSON() },
    });
  callDoc.on();
}
