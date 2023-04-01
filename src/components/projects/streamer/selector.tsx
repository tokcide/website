/** @jsxImportSource solid-js */
// class="form-select form-select-sm"
import {
  createResource,
  createSignal,
  For,
  onMount,
  splitProps,
} from "solid-js";
import type { JSX, Component } from "solid-js";
import { updateLocalStream, updateUserCode } from "./stream.store";
import { usercode } from "./stream.store";
import { useStore } from "@nanostores/solid";

type Props = {
  children?: JSX.Element;
} & JSX.HTMLAttributes<HTMLSelectElement>;

export const StreamSelector: Component<Props> = (props) => {
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
  onMount(() => (navigator.mediaDevices.ondevicechange = refetch));
  onMount(() => {
    const handler = async () =>
      await updateLocalStream({ deviceId: select.value }, check.checked);

    handler().then();
    select.onchange = handler;
    check.onchange = handler;
  });
  return (
    <>
      <select ref={select} {...attrs}>
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
      <input
        ref={check}
        type="checkbox"
        class="btn-check"
        id="audioToggle"
        checked={false}
      />
      <label class="btn btn-outline-primary" for="audioToggle">
        Audio
      </label>
    </>
  );
};

export const UserCode: Component = (
  props: JSX.HTMLAttributes<HTMLInputElement>
) => {
  let input!: HTMLInputElement;
  const [, attrs] = splitProps(props, ["children"]);
  const getUsercode = useStore(usercode);
  return (
    <input
      ref={input}
      value={getUsercode()}
      oninput={() => {
        updateUserCode(input.value);
      }}
      class="form-control"
      placeholder="User code"
      type="text"
      {...attrs}
    />
  );
};
