import "./App.css";
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ARButton, Controllers, XR } from "@react-three/xr";
import { GetCameraPosition } from "./helper-functions/CameraCollisonBox";
import { useProgress } from "@react-three/drei";
import { Charlotte15 } from "./Charlotte15";

function App() {
  const characterRef = useRef();
  const [isColliding, setIsColliding] = useState(false);
  const [isCollidingFromBehind, setIsCollidingFromBehind] = useState(false);
  const [distance, setDistance] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const [inAR, setInAR] = useState(false);
  const { progress } = useProgress();
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const redirectToWebsite = () => {
    window.location.href =
      "https://www.theater-an-der-ruhr.de/de/programm/5759-erweiterte-realitaten";
  };

  return (
    <>
      <audio ref={audioRef} src="/src/assets/kin_short.mp3" preload="auto" />
      {progress === 100 && (
        <ARButton
          className={`custom-ar-button ${inAR ? "hidden" : ""}`}
          sessionInit={{
            optionalFeatures: ["local-floor", "bounded-floor"],
          }}
          onClick={() => {
            inAR ? setInAR(false) : setInAR(true);
            playSound();
          }}
        />
      )}
      {showOverlay && (
        <div className="image-container" onClick={redirectToWebsite}>
          <img
            src="/src/assets/VorabVisuals.png"
            alt="Descriptive Text"
            className="responsive-image"
          />
        </div>
      )}

      <Canvas>
        <Suspense>
          <XR>
            {inAR && !showOverlay && (
              <>
                <Controllers />
                <directionalLight
                  position={[0, 1, 10]}
                  intensity={1}
                  castShadow
                />
                <directionalLight
                  position={[0, -3, 10]}
                  intensity={0}
                  castShadow
                />
                <ambientLight intensity={1.5} />
                <GetCameraPosition
                  targetRef={characterRef}
                  setIsColliding={setIsColliding}
                  setIsCollidingFromBehind={setIsCollidingFromBehind}
                  setDistance={setDistance}
                />
                <mesh position={[0, 0, -2]}>
                  {/* <Charlotte13
                    characterRef={characterRef}
                    isColliding={isColliding}
                    isCollidingFromBehind={isCollidingFromBehind}
                    distance={distance}
                    setShowOverlay={setShowOverlay}
                  /> */}
                  <Charlotte15
                    characterRef={characterRef}
                    isColliding={isColliding}
                    isCollidingFromBehind={isCollidingFromBehind}
                    distance={distance}
                    setShowOverlay={setShowOverlay}
                  />

                  {/* <AnimatedCube /> */}
                </mesh>
              </>
            )}
          </XR>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
