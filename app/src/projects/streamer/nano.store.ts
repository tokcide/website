import { atom, onMount } from "nanostores";
import type Peer from "peerjs";
import { isServer } from "solid-js/web";

export const peerConnection = atom<Peer | undefined>();
onMount(peerConnection, () => {
  if (!isServer) {
    import("@packages/shared")
      .then(({ peerjs }) => new peerjs({ debug: 1 }))
      .then((p) => peerConnection.set(p));
  } else console.info("peerConnection: onMount: server-side");
  return () => peerConnection.get()?.destroy();
});

export const localConnectionId = atom<string>("");
export const targetConnectionId = atom<string>("");
targetConnectionId.subscribe((v) => {
  console.log("this is target", v);
});
