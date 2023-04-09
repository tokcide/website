/** @jsxImportSource solid-js */
import { useStore } from "@nanostores/solid";
import type { Component } from "solid-js";
import { onCleanup, onMount } from "solid-js";
import {
  localConnectionId,
  peerConnection,
  targetConnectionId,
} from "../nano.store";
import type { StreamGroup } from "../solid.stores";
import { setStreams } from "../solid.stores";

export const Connect: Component = () => {
  const peer$ = useStore(peerConnection);

  onMount(() => {
    peer$()?.on("open", (id) => localConnectionId.set(id));

    peer$()?.on("call", (call) => {
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
  onCleanup(() => {
    peer$()?.destroy();
  });
  return (
    <button
      class="btn btn-outline-secondary"
      onclick={() => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            setStreams(0, {
              name: "local-stream",
              fromId: peer$()?.id ?? localConnectionId.get(),
              stream: stream,
            } satisfies StreamGroup);

            const call = peer$()?.call(targetConnectionId.get() ?? "", stream);
            call?.on("error", (err) => console.log(err));
            call?.on("iceStateChanged", (st) => console.log(st));
            call?.on("stream", () => console.log("Not Implemented yet"));
          });
      }}
    >
      Connect
    </button>
  );
};
