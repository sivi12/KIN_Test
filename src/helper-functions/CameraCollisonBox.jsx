import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function GetCameraPosition({
  targetRef,
  setIsColliding,
  setIsCollidingFromBehind,
  setDistance,
}) {
  const { camera } = useThree();
  const textRef = useRef();
  const behindRef = useRef();

  useFrame(() => {
    const playerPositionX = targetRef.current?.matrixWorld?.elements[12];
    const playerPositionZ = targetRef.current?.matrixWorld?.elements[14];
    const characterVector = new THREE.Vector3(
      ...[playerPositionX, playerPositionZ]
    );
    const camVector = new THREE.Vector3(
      ...[camera?.position.x, camera?.position.z]
    );
    const distance = camVector.distanceTo(characterVector).toFixed(3);

    setDistance(distance);

    const isCollidingFromBehind =
      camera.position.z < playerPositionZ && distance >= 0.4;

    behindRef.current.text = `●`;

    textRef.current.text = `${distance}`;

    if (distance < 1.7) {
      if (camera.position.z > playerPositionZ) {
        textRef.current.color = "red";
        setIsColliding(true);
      }
      if (camera.position.z < playerPositionZ && distance >= 0.3) {
        behindRef.current.color = "orange";
        setIsCollidingFromBehind(true);
      }
    } else {
      textRef.current.color = "green";
      behindRef.current.color = "green";
      setIsColliding(false);
      setIsCollidingFromBehind(false);
    }
  });

  return (
    <>
      <Text
        ref={textRef}
        fontSize={0.2}
        color="green"
        position={[0, 2.5, -2]} // Positioniere den Text vor der Kamera
      >
        X: 0 Y: 0 Z: 0
      </Text>
      <Text
        ref={behindRef}
        fontSize={0.2}
        color="green"
        position={[0, 2.2, -2]} // Positioniere den Text vor der Kamera
      ></Text>
    </>
  );
}
