import "./App.css";
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { HandleCollision } from "./HandleCollison";
import { useProgress } from "@react-three/drei";
import { Charlotte } from "./Charlotte";
import Test from "./helper-functions/handle-session-end";
import { Overlay } from "./OverlayImage";

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

  <Overlay />;

  return (
    <>
      <audio ref={audioRef} src="/sounds/kin_short.mp3" preload="auto" />
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

      <Overlay showOverlay={showOverlay} />

      <Canvas>
        <Suspense>
          <XR>
            {inAR && !showOverlay && (
              <>
                <directionalLight
                  castShadow
                  position={[5, 10, 5]}
                  intensity={1}
                  shadow-mapSize-width={512}
                  shadow-mapSize-height={512}
                  shadow-radius={10}
                />
                <ambientLight intensity={1.5} />
                <HandleCollision
                  targetRef={characterRef}
                  setIsColliding={setIsColliding}
                  setIsCollidingFromBehind={setIsCollidingFromBehind}
                  setDistance={setDistance}
                />
                <mesh position={[0, 0, -2]}>
                  <Charlotte
                    characterRef={characterRef}
                    isColliding={isColliding}
                    isCollidingFromBehind={isCollidingFromBehind}
                    distance={distance}
                    setShowOverlay={setShowOverlay}
                  />
                </mesh>
                {/* <mesh
                  position={[0, 0, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  receiveShadow
                >
                  <planeGeometry args={[10, 10]} />

                  <shadowMaterial />
                </mesh> */}
              </>
            )}
            <Test showOverlay={showOverlay} />
          </XR>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
