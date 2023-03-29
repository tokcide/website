/** @jsxImportSource solid-js */
import type { JSX, Component } from "solid-js";
import { remoteStream } from "./stream.state";

type Props = {
  children?: JSX.Element;
  width: string; //640
  height: string; //400
  video: HTMLVideoElement;
};
export const Canvas: Component<Props> = (props) => {
  let canvas: HTMLCanvasElement | undefined;

  const click = () => {
    canvas
      ?.getContext("2d")
      ?.drawImage(props.video, 0, 0, props.video.width, props.video.height);
  };
  return (
    <>
      <canvas ref={canvas} width={props.width} height={props.height}></canvas>
      <button onclick={click} class="btn btn-outline-success">
        snap
      </button>
    </>
  );
};
