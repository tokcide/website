/** @jsxImportSource solid-js */
import { createSignal, createEffect, For } from "solid-js";
import type { JSX, Component } from "solid-js";
import { streams, StreamGroup } from "../solid.stores";

export const StreamBox: Component<{ children?: JSX.Element }> = (props) => {
  createEffect(() => {
    console.log(streams);
  });

  return (
    <div>
      <For each={streams}>{(stream) => <StreamVideo stream={stream} />}</For>
    </div>
  );
};

export const StreamVideo: Component<
  { stream: StreamGroup } & JSX.HTMLAttributes<HTMLVideoElement>
> = (props) => {
  let video!: HTMLVideoElement;
  const [stream] = createSignal(props.stream);
  const ID = "video" + props.stream.fromId;
  createEffect(() => {
    video.srcObject = stream().stream;
    video.load();
  });
  return (
    <>
      <label for={ID}>{props.stream.name}</label>
      <video
        ref={video}
        id={ID}
        class="col-auto rounded"
        autoplay
        playsinline
        controls={false}
      ></video>
    </>
  );
};
