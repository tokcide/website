/** @jsxImportSource solid-js */
import { createEffect, createSignal } from "solid-js";
import type { JSX, Component } from "solid-js";
import { isServer } from "solid-js/web";
import { useStore } from "@nanostores/solid";
import { wrtc, sp } from "components/projects/streamer/stream.state";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import WebRTC from "shared/libs/client/WebRTC";

type Props = {
  children?: JSX.Element;
  text: string;
};

export const Call: Component<Props> = (props) => {
  let btn: HTMLButtonElement | undefined;
  const webrtc = useStore(wrtc);
  webrtc();
  // const supabase = sp.get();
  // const channel = supabase.channel("call", {
  //   config: { broadcast: { self: true, ack: true } },
  // });
  // const pc = new RTCPeerConnection();
  const click = (ev: Event) => {};
  createEffect(() => {
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_KEY,
      {
        realtime: {
          params: {
            eventsPerSecond: 20,
          },
        },
      }
    );
    const webrtc = new WebRTC();
    sp.set(supabase);
    wrtc.set(webrtc);
  });
  setTimeout(() => {
    console.log(sp.get(), wrtc.get());
  }, 1500);
  //   pc.onicecandidate = (ev) => {
  //     ev.candidate && channel.send()
  //   };
  // };
  // channel.on()
  // const $localStream = useStore(localStream);
  // createSignal(new RTCPeerConnection());
  // createEffect(() => {
  //   $localStream;
  //   // const $getUsercode = useStore(usercode);
  // });

  return (
    <>
      <button
        ref={btn}
        onclick={click}
        class="btn btn-outline-success"
        id="callButton"
      >
        Send Call Request {props.text}
      </button>
    </>
  );
};

export const Answer: Component<Props> = (props) => {
  let btn: HTMLButtonElement | undefined;
  const webrtc = useStore(wrtc);
  webrtc();
  // const supabase = sp.get();
  // const channel = supabase.channel("call", {
  //   config: { broadcast: { self: true, ack: true } },
  // });
  // const pc = new RTCPeerConnection();
  const click = (ev: Event) => {};
  createEffect(() => {
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_KEY,
      {
        realtime: {
          params: {
            eventsPerSecond: 20,
          },
        },
      }
    );
    const webrtc = new WebRTC();
    sp.set(supabase);
    wrtc.set(webrtc);
  });
  setTimeout(() => {
    console.log(sp.get(), wrtc.get());
  }, 1500);
  //   pc.onicecandidate = (ev) => {
  //     ev.candidate && channel.send()
  //   };
  // };
  // channel.on()
  // const $localStream = useStore(localStream);
  // createSignal(new RTCPeerConnection());
  // createEffect(() => {
  //   $localStream;
  //   // const $getUsercode = useStore(usercode);
  // });

  return (
    <>
      <button
        ref={btn}
        onclick={click}
        class="btn btn-outline-success"
        id="callButton"
      >
        Send Call Request {props.text}
      </button>
    </>
  );
};

export const HangUp: Component<Props> = (props) => {
  let btn: HTMLButtonElement | undefined;
  const webrtc = useStore(wrtc);
  webrtc();
  // const supabase = sp.get();
  // const channel = supabase.channel("call", {
  //   config: { broadcast: { self: true, ack: true } },
  // });
  // const pc = new RTCPeerConnection();
  const click = (ev: Event) => {};
  createEffect(() => {
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_KEY,
      {
        realtime: {
          params: {
            eventsPerSecond: 20,
          },
        },
      }
    );
    const webrtc = new WebRTC();
    sp.set(supabase);
    wrtc.set(webrtc);
  });
  setTimeout(() => {
    console.log(sp.get(), wrtc.get());
  }, 1500);
  //   pc.onicecandidate = (ev) => {
  //     ev.candidate && channel.send()
  //   };
  // };
  // channel.on()
  // const $localStream = useStore(localStream);
  // createSignal(new RTCPeerConnection());
  // createEffect(() => {
  //   $localStream;
  //   // const $getUsercode = useStore(usercode);
  // });

  return (
    <>
      <button
        ref={btn}
        onclick={click}
        class="btn btn-outline-success"
        id="callButton"
      >
        Send Call Request {props.text}
      </button>
    </>
  );
};
