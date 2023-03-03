// import { determineIPs } from "./server.js";
import { updateCameraList } from "./camera.js";
async function getConnectedDevices(type) {
  // Fetch an array of devices of a certain type
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === type);
}

async function openCamera(cameraId, minWidth, minHeight) {
  // Open camera with at least minWidth and minHeight capabilities
  const constraints = {
    audio: { echoCancellation: true },
    video: {
      deviceId: cameraId,
      width: { min: minWidth },
      height: { min: minHeight },
    },
  };

  return await navigator.mediaDevices.getUserMedia(constraints);
}

// Get the initial set of cameras connected
let cameras;
getConnectedDevices("videoinput").then((videoCameras) => {
  updateCameraList(videoCameras);
  cameras = videoCameras;
});

// // Listen for changes to media devices and update the list accordingly
navigator.mediaDevices.addEventListener("devicechange", (event) => {
  getConnectedDevices("videoinput").then((newCameraList) =>
    updateCameraList(newCameraList)
  );
});

// if (cameras && cameras.length > 0) {
//   // Open first available video camera with a resolution of 1280x720 pixels
//   const stream = openCamera(cameras[0].deviceId, 1280, 720).then((stream) => {
//     video.srcObject = stream;
//   });
// }

// const video = document.querySelector("video#localVideo");
// //   await playVideoFromCamera()
// if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//   // Not adding `{ audio: true }` since we only want video now
//   navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
//     // video.src = window.URL.createObjectURL(stream);
//     video.srcObject = stream;
//     // ws.video.play();
//   });
// }
