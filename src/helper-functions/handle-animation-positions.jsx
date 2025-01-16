import { syncPosition } from "./syncPosition";

export function animationPositionHandler(
  currentAnimation,
  savedPositions,
  group,
  currentAnimationRef
) {
  let positionData = null;

  if (
    currentAnimation === "positiveDanceOne" ||
    currentAnimation === "negativeDanceOne"
  ) {
    positionData = savedPositions.current.danceOne;
  }

  if (
    currentAnimation === "positiveBackwards" ||
    currentAnimation === "negativeBackwards"
  ) {
    positionData = savedPositions.current.backwards;
  }

  setTimeout(() => {
    syncPosition(positionData, group, currentAnimation, currentAnimationRef);
  }, 50);
}
