import { atom, onMount } from "nanostores";
import { createEffect } from "solid-js";
import { isServer } from "solid-js/web";
import { Button, Card } from "@packages/ui/index";

export const f = atom<MediaStream | undefined>();
onMount(f, () => {
  if (!isServer) {
    // import Peer from "peerjs";
    import("peerjs")
      .then((p) => new p.default({ debug: 3 }))
      .then((p) => console.log(p.id));
    f.set(new MediaStream());
    console.log("changed");
  }
  return () => console.log("removed");
});

export const App = () => {
  console.log("rerunning component");
  // const s = useStore(f);
  createEffect(() => {
    // console.log(s());
  });
  return (
    <>
      <div>Hello</div>
      <button onclick={() => f.set(new MediaStream())}>change</button>{" "}
      <Button variant="primary">Click</Button>{" "}
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default App;
