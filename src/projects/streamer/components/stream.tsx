/** @jsxImportSource solid-js */
import { createSignal, createEffect, For, onMount, Show } from "solid-js";
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
  let canvas!: HTMLCanvasElement;
  let video!: HTMLVideoElement;
  const [stream] = createSignal(props.stream);
  const [clicked, setClicked] = createSignal(false);

  const ID = "video" + props.stream.fromId;
  createEffect(() => {
    video.srcObject = stream().stream;
    video.load();
  });
  return (
    <>
      <div class="container-fluid">
        <label for={ID}>{props.stream.name}</label>
        <video
          ref={video}
          id={ID}
          class="col-auto rounded"
          autoplay
          playsinline
          controls={false}
        ></video>
        <Show
          when={clicked()}
          fallback={
            <button
              class="btn btn-outline-primary m-2"
              onclick={() => {
                setClicked(true);
                canvas.height = video.videoHeight;
                canvas.width = video.videoWidth;
                canvas.getContext("2d")?.drawImage(video, 0, 0);
              }}
            >
              Capture
            </button>
          }
        >
          <canvas ref={canvas}></canvas>
          <button
            class="btn btn-outline-danger m-2"
            onclick={() => setClicked(false)}
          >
            Delete
          </button>
        </Show>
      </div>
    </>
  );
};
