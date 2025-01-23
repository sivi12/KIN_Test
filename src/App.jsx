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
import { HandleCollision } from "./helper-functions/handle-collision";
import HandleSound from "./helper-functions/handle-sound";

function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [inAR, setInAR] = useState(false);
  const { progress } = useProgress();
  const audioRef = useRef(null);

  const [isColliding, setIsColliding] = useState(false);
  const [isCollidingFromBehind, setIsCollidingFromBehind] = useState(false);
  const characterRef = useRef();

  return (
    <>
      <audio ref={audioRef} src="/sounds/kin_short.mp3" preload="auto" />
      {progress === 100 && (
        <LandingPage audioRef={audioRef} inAR={inAR} setInAR={setInAR} />
      )}

      <OverlayImage showOverlay={showOverlay} />

      <Canvas className={inAR ? "ARCanvas" : "landingPageCanvas"}>
        <Suspense>
          <XR>
            {inAR && !showOverlay && (
              <>
                <HandleSessionStart />
                <HandleCollision
                  targetRef={characterRef}
                  setIsColliding={setIsColliding}
                  setIsCollidingFromBehind={setIsCollidingFromBehind}
                />
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
                  <Charlotte
                    setShowOverlay={setShowOverlay}
                    isColliding={isColliding}
                    isCollidingFromBehind={isCollidingFromBehind}
                    characterRef={characterRef}
                  />
                </mesh>
              </>
            )}
            <HandleSound audioRef={audioRef} />
            <HandleSessionEnd showOverlay={showOverlay} />
          </XR>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
