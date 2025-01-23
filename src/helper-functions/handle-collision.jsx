import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function HandleCollision({
  targetRef,
  setIsColliding,
  setIsCollidingFromBehind,
}) {
  const { camera } = useThree();

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

    if (distance < 1.5) {
      if (camera.position.z > playerPositionZ) {
        setIsColliding(true);
      }
      if (camera.position.z < playerPositionZ && distance >= 0.3) {
        setIsCollidingFromBehind(true);
      }
    } else {
      setIsColliding(false);
      setIsCollidingFromBehind(false);
    }
  });
}
