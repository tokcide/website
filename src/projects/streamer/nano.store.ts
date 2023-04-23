import { atom, onMount } from "nanostores";
import type { Peer } from "@packages/shared";
import { isServer } from "solid-js/web";
import { StreamGroup, setStreams } from "./solid.stores";

export const peerConnection = atom<Peer | undefined>();
onMount(peerConnection, () => {
  if (!isServer) {
    import("@packages/shared")
      .then(({ peerjs }) => new peerjs({ debug: 3 }))
      .then((p) => peerConnection.set(p))
      .then(() => {
        peerConnection.get()?.on("open", (id) => localConnectionId.set(id));
        peerConnection.get()?.on("call", (call) => {
          call.on("stream", (stream) =>
            setStreams(0, {
              name: "remote-stream",
              fromId: call.peer,
              stream: stream,
            } satisfies StreamGroup)
          );
          call.answer();

          console.log("Call accepted");
        });
      });
  } else console.info("peerConnection: onMount: server-side");

  return () => peerConnection.get()?.destroy();
});

export const localConnectionId = atom<string>("");
export const targetConnectionId = atom<string>("");
