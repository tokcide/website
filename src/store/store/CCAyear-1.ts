import { atom } from "nanostores";
import servers from "shared/jsons/serverConfig.json";

export const queueName = atom("");

export const pc = atom(new RTCPeerConnection(servers));
export const localStream = atom<MediaStream>(new MediaStream());
export const remoteStream = atom<MediaStream>(new MediaStream());
