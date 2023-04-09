import { useStore } from "@nanostores/solid";
import { createSignal, onMount } from "solid-js";
import { Show } from "solid-js/web";
import { peerConnection } from "../nano.store";

import { Html5QrcodeScanner } from "html5-qrcode";

import type { Html5QrcodeResult } from "html5-qrcode/esm/core";

import { targetConnectionId } from "../nano.store";
export const Scanner = () => {
  onMount(() => {
    function onScanSuccess(
      decodedText: string,
      decodedResult: Html5QrcodeResult
    ) {
      // handle the scanned code as you like, for example:
      alert("QR captured, you can stop scanning now");
      targetConnectionId.set(decodedText);
      console.log(`Code matched = ${decodedText}`, decodedResult);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 450 },
      },
      false
    );
    html5QrcodeScanner.render(onScanSuccess, undefined);
  });
  return <div id="reader"></div>;
};

export const Generate = () => {
  const [id, setId] = createSignal<string>();
  const $peer = useStore(peerConnection);

  $peer()?.on("open", (id) => setId(id));

  return (
    <>
      <Show when={id() != null} fallback={<div>Loading...</div>}>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${id()}&size=750x750`}
          alt=""
          title=""
        />
      </Show>
    </>
  );
};
