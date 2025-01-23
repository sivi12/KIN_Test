import "./App.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { XR } from "@react-three/xr";
import { useProgress } from "@react-three/drei";
import { Charlotte } from "./Charlotte";
import { OverlayImage } from "./Overlay-image";
import HandleSessionEnd from "./helper-functions/handle-session-end";
import LandingPage from "./landing-page/Landing-page";
import { HandleSessionStart } from "./helper-functions/ar-session-starter";

function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [inAR, setInAR] = useState(false);
  const { progress } = useProgress();
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current) {
        audioRef.current.pause();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/sounds/kin_short.mp3" preload="auto" />
      {progress === 100 && (
        <LandingPage playsound={playSound} inAR={inAR} setInAR={setInAR} />
      )}

      <OverlayImage showOverlay={showOverlay} />

      <Canvas className={inAR ? "ARCanvas" : "landingPageCanvas"}>
        <Suspense>
          <XR>
            {inAR && !showOverlay && (
              <>
                <HandleSessionStart />
                <directionalLight
                  castShadow
                  position={[5, 10, 5]}
                  intensity={1}
                  shadow-mapSize-width={512}
                  shadow-mapSize-height={512}
                  shadow-radius={10}
                />
                <ambientLight intensity={1.5} />

                <mesh position={[0, 0, -2]}>
                  <Charlotte setShowOverlay={setShowOverlay} />
                </mesh>
              </>
            )}

            <HandleSessionEnd showOverlay={showOverlay} />
          </XR>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
