import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function AnimatedCube({
  position,
  size,
  color = "#00cc00",
  speed = 0.01,
}) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += speed;
  });
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
