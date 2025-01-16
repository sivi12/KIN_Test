import { extractPositionDataFromClip } from "./extractPositionDataFromClip";
import { removePositionFromClip } from "./removeXZPositionFromClip";

export function handlePositionData(savedPositions, loadedAnimations) {
  if (!savedPositions.current) {
    savedPositions.current = {
      backwards: extractPositionDataFromClip(loadedAnimations[0]),
      danceOne: extractPositionDataFromClip(loadedAnimations[1], true),
      forward: extractPositionDataFromClip(loadedAnimations[2], true),
      sidewards: extractPositionDataFromClip(loadedAnimations[3], true),
    };

    removePositionFromClip(loadedAnimations[0], true, false, true);
    removePositionFromClip(loadedAnimations[1], true, false, true);
    removePositionFromClip(loadedAnimations[2], true, false, true);
    removePositionFromClip(loadedAnimations[3], true, false, true);
    removePositionFromClip(loadedAnimations[4], true, false, true);

    //console.log("Saved positions:", savedPositions.current);
  }
}
