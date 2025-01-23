import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export const HandleSessionStart = () => {
  const { gl } = useThree();

  useEffect(() => {
    if (navigator.xr) {
      navigator.xr
        .requestSession("immersive-ar", {
          optionalFeatures: ["local-floor", "bounded-floor"],
        })
        .then((session) => {
          gl.xr.setSession(session); // Korrekt mit dem Three.js XRManager
        })
        .catch((err) => {
          console.error("Failed to start AR session", err);
        });
    } else {
      console.error("WebXR is not supported on this device.");
    }
  }, [gl]);

  return null;
};

export default HandleSessionStart;
