import { atom } from "nanostores";
import type Peer from "peerjs";

export const peerConnection = atom<Peer | null>(null);
export const localConnectionId = atom<string>("");
export const targetConnectionId = atom<string>("");
targetConnectionId.subscribe((v) => {
  console.log("this is target", v);
});
