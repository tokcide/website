import { action, atom } from "nanostores";
import type { SupabaseClient } from "@supabase/supabase-js";
import type WebRTC from "shared/libs/client/WebRTC";

export const localStream = atom<MediaStream | null>(null);
export const remoteStream = atom<MediaStream | null>(null);
export const usercode = atom<string>("");

export const wrtc = atom<WebRTC | null>(null);
export const sp = atom<SupabaseClient | null>(null);
type constraints = boolean | MediaTrackConstraints;
export const updateLocalStream = action(
  localStream,
  "update",
  async (store, video: constraints, audio: constraints) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: video,
      audio: audio,
    });
    store.set(stream);
  }
);
