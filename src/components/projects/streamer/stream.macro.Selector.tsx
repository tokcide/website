/** @jsxImportSource solid-js */
// class="form-select form-select-sm"
import {
  createEffect,
  createResource,
  createSignal,
  For,
  onMount,
  splitProps,
} from "solid-js";
import type { JSX, Component } from "solid-js";
import { useStore } from "@nanostores/solid";
import { localStream, remoteStream, updateLocalStream } from "./stream.state";

import type { HTMLAttributes } from "astro/types";

type Props = {
  children?: JSX.Element;
} & JSX.HTMLAttributes<HTMLSelectElement>;

export const App: Component<Props> = (props) => {
  const [, attrs] = splitProps(props, ["children"]);
  let check!: HTMLInputElement, select!: HTMLSelectElement;
  const [constraint, setConstraint] = createSignal("videoinput");
  const getCameras = () => {
    return navigator.mediaDevices
      .enumerateDevices()
      .then((devices) =>
        devices.filter((device) => device.kind === constraint())
      );
  };
  const [cameras, { mutate, refetch }] = createResource(constraint, getCameras);
  const updateStream = async (ev: Event) => {
    const streamL = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: select?.value },
      audio: check?.checked,
    });
    streamL ? localStream.set(streamL) : null;
  };
  onMount(() => (navigator.mediaDevices.ondevicechange = refetch));
  onMount(() => {
    const LocalStreamChangeEvent = () =>
      updateLocalStream({ deviceId: select?.value }, check?.checked);
    select.onchange = LocalStreamChangeEvent;
    check.onchange = LocalStreamChangeEvent;
  });
  return (
    <>
      <select
        // ref={select}
        ref={select}
        {...attrs}
      >
        <For each={cameras()}>
          {(camera, index) => (
            <option
              value={camera.deviceId}
              selected={index() === 0 ? true : false}
              label={camera.label === "" ? `Camera ${index()}` : camera.label}
            >
              {camera.label === "" ? `Camera ${index()}` : camera.label}
            </option>
          )}
        </For>
      </select>
      <input ref={check} type="checkbox" class="btn-check" id="audioToggle" />
      <label class="btn btn-outline-primary" for="audioToggle">
        Audio
      </label>
    </>
  );
};
