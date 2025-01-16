export function extractPositionDataFromClip(clip, normalizeToZero = false) {
  const positionTrack = clip.tracks.find((track) =>
    track.name.endsWith("Hips.position")
  );

  if (!positionTrack) {
    console.warn(`No Hips.position track found in clip ${clip.name}`);
    return null;
  }

  const times = positionTrack.times; // Zeitpunkte der Keyframes
  const positions = []; // Array für [x, y, z] Positionen

  // Hole den Startversatz für die Korrektur, falls benötigt
  let offsetX = 0;
  let offsetZ = 0;

  if (normalizeToZero && positionTrack.values.length >= 3) {
    offsetX = positionTrack.values[0] / 100; // x-Wert des ersten Keyframes
    offsetZ = positionTrack.values[1] / 100; // z-Wert des ersten Keyframes
  }

  for (let i = 0; i < positionTrack.values.length; i += 3) {
    const x = positionTrack.values[i] / 100 - offsetX; // x normalisieren
    const z = positionTrack.values[i + 1] / 100 - offsetZ; // z normalisieren
    const y = positionTrack.values[i + 2] / 100; // y bleibt gleich

    positions.push({ x, y, z });
  }

  return { times, positions };
}
