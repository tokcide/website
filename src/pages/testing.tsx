import { useStore } from "@nanostores/solid";
import { atom, onMount } from "nanostores";
import { createEffect } from "solid-js";
import { isServer } from "solid-js/web";

const f = atom<MediaStream, { this: "is cool" }>(new MediaStream());
onMount(f, () => {
  if (!isServer) {
    // import Peer from "peerjs";
    import("peerjs").then((p) => new p.default({ debug: 3 })).then((p) => p.id);
    f.set(new MediaStream());
    console.log("changed");
  }
  return () => console.log("removed");
});

export const App = () => {
  const s = useStore(f);
  createEffect(() => {
    console.log(s());
  });
  return (
    <>
      <div>Hello</div>
      <button onclick={() => f.set(new MediaStream())}>change</button>
    </>
  );
};
