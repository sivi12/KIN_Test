import { useThree } from "@react-three/fiber";

function HandleSessionEnd({ showOverlay }) {
  const { gl } = useThree(); // Zugriff auf WebGLRenderer

  if (gl.xr && gl.xr.isPresenting && showOverlay) {
    gl.xr
      .getSession()
      .end()
      .then(() => {
        console.log("AR session ended.");
      })
      .catch((err) => {
        console.error("Error ending AR session:", err);
      });
  } else {
    console.log("No AR session to end.");
  }
}

export default HandleSessionEnd;
