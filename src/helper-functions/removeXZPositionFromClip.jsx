import * as THREE from "three";
export function removePositionFromClip(
  clip,
  deleteX = false,
  deleteY = false,
  deleteZ = false
) {
  clip.tracks = clip.tracks.map((track) => {
    if (track.name.endsWith("Hips.position")) {
      const newValues = track.values.slice();

      for (let i = 0; i < newValues.length; i += 3) {
        // Setze x (Index i) und z (Index i + 2) auf 0
        if (deleteX === true) {
          newValues[i] = 0; // x
        }
        if (deleteY === true) {
          newValues[i + 2] = 0; //y
        }
        if (deleteZ === true) {
          newValues[i + 1] = 0; // z
        }
      }

      return new THREE.VectorKeyframeTrack(
        track.name,
        track.times,
        newValues,
        track.interpolation
      );
    }
    return track;
  });
}
