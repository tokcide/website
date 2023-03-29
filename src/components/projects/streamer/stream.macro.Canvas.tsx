/** @jsxImportSource solid-js */
import { createEffect, createSignal } from "solid-js";
import type { JSX, Component } from "solid-js";
import { useStore } from "@nanostores/solid";
import { localStream, remoteStream } from "./stream.state";

type Props = {
  children?: JSX.Element;
};

export const App: Component<Props> = (props) => {
  let localVideo!: HTMLVideoElement, remoteVideo!: HTMLVideoElement;
  const getLocalStream = useStore(localStream);
  const getRemoteStream = useStore(remoteStream);
  createEffect(() => (localVideo.srcObject = getLocalStream()));
  createEffect(() => (remoteVideo.srcObject = getRemoteStream()));

  return (
    <>
      <div class="row">
        <video
          ref={localVideo}
          class="col-6 rounded"
          id="localVideo"
          playsinline
          autoplay
          controls={false}
        ></video>
        <video
          ref={remoteVideo}
          class="col-6 rounded"
          id="remoteVideo"
          autoplay
          playsinline
          controls={false}
        ></video>
      </div>
    </>
  );
};
