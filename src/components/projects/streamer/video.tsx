/** @jsxImportSource solid-js */
import { createEffect, createSignal, on, onMount } from "solid-js";
import type { JSX, Component } from "solid-js";
import { useStore } from "@nanostores/solid";
// import {
//   localStream,
//   localStreamAudioOptions,
//   localStreamVideoOptions,
//   remoteStream,
//   testStore,
// } from "./store";
import { localStream } from "./stream.store";
type Props = {
  children?: JSX.Element;
};

export const LocalStream: Component<Props> = (props) => {
  let localVideo!: HTMLVideoElement;
  const getStream = useStore(localStream);
  createEffect(() => {
    localVideo.srcObject = getStream();
    localVideo.load();
  });
  return (
    <>
      <video
        ref={localVideo}
        class="col-6 rounded"
        id="localVideo"
        autoplay
        playsinline
        controls={false}
      ></video>
    </>
  );
};

export const RemoteStream: Component<Props> = (props) => {
  let remoteVideo!: HTMLVideoElement;

  return (
    <>
      <video
        ref={remoteVideo}
        class="col-6 rounded"
        id="localVideo"
        autoplay
        playsinline
        controls={false}
      ></video>
    </>
  );
};
