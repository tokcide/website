/** @jsxImportSource solid-js */
import { useStore } from "@nanostores/solid";
import {
  createEffect,
  createResource,
  createSignal,
  For,
  lazy,
  onMount,
  splitProps,
} from "solid-js";
import type { JSX, Component } from "solid-js";
import { peerConnection } from "./nano.store";

type Props = {
  children?: JSX.Element;
} & JSX.HTMLAttributes<HTMLSelectElement>;

export const Some: Component<Props> = (props) => {
  let callbutton!: HTMLButtonElement;
  let answbutton!: HTMLButtonElement;
  let remoteVideo!: HTMLVideoElement;
  let localVideo!: HTMLVideoElement;
  const $peer = useStore(peerConnection);
  const [$id, setId] = createSignal<string>();
  const [$targetid, setTargetId] = createSignal<string>();
  const [$localStream, setLocalStream] = createSignal<MediaStream>();
  const [$remoteStream, setRemoteStream] = createSignal<MediaStream>();

  onMount(() => {
    $peer()?.on("open", (id) => setId($peer()?.id));
    const CallHandler = () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(
        (stream) => {
          setLocalStream(stream);
          const call = $peer()?.call($targetid() ?? "", stream);
          console.log("current stream", stream);
          call?.on("error", (err) => console.log(err));
          call?.on("iceStateChanged", (st) => console.log(st));
          call?.on("stream", (remoteStream) => {
            console.log("recieved stream", remoteStream);
            setRemoteStream(remoteStream);
            // Show stream in some <video> element.
          });
        },
        (err) => {
          console.error("Failed to get local stream", err);
        }
      );
    };
    const AnswHandler = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          setLocalStream(stream);
          $peer()?.on("call", (call) => {
            setRemoteStream(call.localStream);
            call.answer(stream);
          });
        });
    };
    callbutton.onclick = CallHandler;
    answbutton.onclick = AnswHandler;
  });
  createEffect(() => {
    remoteVideo.srcObject = $remoteStream() ?? new MediaStream();
    remoteVideo.load();
  });
  createEffect(() => {
    localVideo.srcObject = $localStream() ?? new MediaStream();
    localVideo.load();
  });
  return (
    <div class="container">
      <input type="text" oninput={(ev) => setTargetId(ev.target.value)} />
      <button class="btn" ref={callbutton}>
        Call
      </button>
      <button class="btn" ref={answbutton}>
        Answer
      </button>
      <p>{$id()}</p>
      <div class="row">
        <video
          ref={localVideo}
          class="col-6 rounded"
          id="remoteVideo"
          autoplay
          playsinline
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
    </div>
  );
};
