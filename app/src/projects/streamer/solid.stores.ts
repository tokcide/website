import { createStore } from "solid-js/store";
export interface StreamGroup {
  name: string;
  fromId: string;
  stream: MediaStream;
}
export const [streams, setStreams] = createStore<StreamGroup[]>([]);
