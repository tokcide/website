import { action, atom } from "nanostores";

type constraints = boolean | MediaTrackConstraints;

export const localStream = atom<MediaStream | null>(null);
export const updateLocalStream = action(
  localStream,
  "update",
  async (store, video: constraints, audio: constraints) => {
    store
      .get()
      ?.getTracks()
      .forEach((track) => track.stop());
    const stream = await navigator.mediaDevices.getUserMedia({
      video: video,
      audio: audio,
    });
    store.set(stream);
  }
);

export const usercode = atom<string>("");
// export const randomUserCode = action(
//   usercode,
//   "random",
//   (store, length: number) =>

//       Math.random()
//         .toString(36)
//         .substring(2, length + 2)
//     )
// );
export const updateUserCode = action(
  usercode,
  "update",
  (store, value: string) => store.set(value)
);
