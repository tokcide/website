import { atom } from "nanostores";
import type { SupabaseClient } from "@supabase/supabase-js";
import type WebRTC from "shared/libs/client/WebRTC";

export const localStream = atom<MediaStream | null>(null);
export const remoteStream = atom<MediaStream | null>(null);
export const usercode = atom<string>("");

export const wrtc = atom<WebRTC | null>(null);
export const sp = atom<SupabaseClient | null>(null);
