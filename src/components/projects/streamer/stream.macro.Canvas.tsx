/** @jsxImportSource solid-js */
import { createEffect, createSignal } from "solid-js";
import type { JSX, Component } from "solid-js";
import { useStore } from "@nanostores/solid";
import { localStream, remoteStream } from "./stream.state";

type Props = {
  children?: JSX.Element;
};

const App: Component<Props> = (props) => {
  const $getLocalStream = useStore(localStream);
  const $getRemoteStream = useStore(remoteStream);
  console.log("Videos was refreshed");
  createEffect(() => {
    console.log("CreateEffect inside video was triggered.");
    console.info("local", $getLocalStream());
    console.info("local", $getRemoteStream());
  });

  return (
    <>
      <div class="row">
        <video
          ref={(localVideo) => (localVideo.srcObject = $getLocalStream())}
          class="col-6 rounded"
          id="localVideo"
          playsinline
          autoplay
          controls={false}
        ></video>
        <video
          ref={(remoteVideo) => (remoteVideo.srcObject = $getRemoteStream())}
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
export default App;
