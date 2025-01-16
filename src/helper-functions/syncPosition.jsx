import gsap from "gsap";

export function syncPosition(
  positionData,
  group,
  animationName = "",
  currentAnimationRef,
  durationMultiplier = 1
) {
  if (!positionData || !group) {
    console.error("Position data or group is missing");
    return;
  }

  const { times, positions } = positionData;
  const startX = group.current.position.x;
  const startZ = group.current.position.z;
  //const rotationY = group.current.rotation.y;

  positions.forEach((pos, index) => {
    if (index < positions.length - 1) {
      const nextTime = times[index + 1] - times[index]; // Dauer zwischen Keyframes
      const duration = nextTime * durationMultiplier; // Zeit skaliert mit dem Multiplier

      if (animationName.startsWith("positive")) {
        gsap.to(group.current.position, {
          duration,
          x: startX + pos.x,
          z: startZ + pos.z,
          ease: "none",
          delay: times[index] * durationMultiplier,
          onUpdate: () => {
            if (currentAnimationRef.current !== animationName) {
              gsap.killTweensOf(group.current.position);
              console.log(currentAnimationRef.current, "killed");
            }
          },
        });
      }

      if (animationName.startsWith("negative")) {
        gsap.to(group.current.position, {
          duration,
          x: startX - pos.x,
          z: startZ - pos.z,
          ease: "none",
          delay: times[index] * durationMultiplier,
          onUpdate: () => {
            if (currentAnimationRef.current !== animationName) {
              console.log(currentAnimationRef.current, animationName);
              gsap.killTweensOf(group.current.position);
            }
          },
        });
      }

      // if (animationName === "forward") {
      //   gsap.to(group.current.position, {
      //     duration,
      //     x: startX - pos.x,
      //     z: startZ - pos.z,
      //     ease: "none",
      //     delay: times[index] * durationMultiplier,
      //     onUpdate: () => {
      //       if (currentAnimationRef.current !== animationName) {
      //         gsap.killTweensOf(group.current.position);
      //       }
      //     },
      //   });
      // }
    }
  });
}
