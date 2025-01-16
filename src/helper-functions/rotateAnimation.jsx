import * as THREE from "three";

export function rotateAnimation(clip) {
  const rotationY = Math.PI; // 180 Grad Drehung

  clip.tracks.forEach((track) => {
    if (track.name.endsWith(".quaternion")) {
      console.log(track);
      // Erstelle die Zielrotation als Quaternion
      const rotationQuat = new THREE.Quaternion();
      rotationQuat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotationY);

      // Iteriere durch die Werte des Tracks
      for (let i = 0; i < track.values.length; i += 4) {
        // Extrahiere die bestehenden Quaternion-Werte
        const x = track.values[i];
        const y = track.values[i + 1];
        const z = track.values[i + 2];
        const w = track.values[i + 3];

        // Erstelle die aktuelle Quaternion aus den Keyframe-Werten
        const currentQuat = new THREE.Quaternion(x, y, z, w);

        // Kombiniere die aktuelle Quaternion mit der Y-Drehung
        const newQuat = new THREE.Quaternion();
        newQuat.multiplyQuaternions(rotationQuat, currentQuat); // Drehung anwenden

        // Normiere die neue Quaternion
        newQuat.normalize();

        // Schreibe die neuen Quaternion-Werte in den Track zurück
        track.values[i] = newQuat.x;
        track.values[i + 1] = newQuat.y;
        track.values[i + 2] = newQuat.z;
        track.values[i + 3] = newQuat.w;
      }
    }
  });
}
