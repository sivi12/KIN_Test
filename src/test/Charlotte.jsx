import React, { useState } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";

export default function Charlotte({ characterRef, isColliding }) {
  const [currentAnimation, setCurrentAnimation] = useState(null);

  const group = React.useRef();
  const { scene, animations: loadedAnimations } = useGLTF(
    "src/assets/charlotte.glb"
  );
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(loadedAnimations, group);

  console.log(loadedAnimations);

  // //__________________________________________________________________________________________________________
  // function removeRootMotionFromClip(clip) {
  //   // Prüfe alle Tracks in diesem Clip
  //   clip.tracks = clip.tracks.filter((track) => {
  //     // Beispiel: track.name === 'mixamorigHips.position' o.ä.
  //     // Prüfe, ob es ein Positions-Track der Hüfte ist
  //     const isHipsPosition = track.name.endsWith("Hips.position");
  //     return !isHipsPosition;
  //   });
  // }

  // removeRootMotionFromClip(loadedAnimations[0]);
  // removeRootMotionFromClip(loadedAnimations[2]);
  // removeRootMotionFromClip(loadedAnimations[3]);
  // removeRootMotionFromClip(loadedAnimations[4]);
  // //__________________________________________________________________________________________________________

  React.useEffect(() => {
    const dance = actions["DanceOne"];
    const backwards = actions["Backwards"];
    const forwards = actions["Forward"];
    const sidewards = actions["Sidewards"];
    const stopSign = actions["StopSign"];
    backwards.loop = THREE.LoopOnce;
    backwards.clampWhenFinished = true;
    forwards.loop = THREE.LoopOnce;
    forwards.clampWhenFinished = true;
    sidewards.loop = THREE.LoopOnce;
    sidewards.clampWhenFinished = true;
    stopSign.loop = THREE.LoopOnce;
    stopSign.clampWhenFinished = true;

    forwards.play();

    if (isColliding && dance.isRunning() === true) {
      dance.crossFadeTo(backwards, 0.8);
      backwards.reset().play();
      // setCurrentAnimation("backwards");
      // backwards.getMixer().addEventListener("finished", (event) => {
      //   if (event.action === backwards) {
      //     backwards.fadeOut(0.5);
      //     stopSign.reset().fadeIn(0.5).play();
      //     setCurrentAnimation("stopSign");
      //   }
      // });

      // stopSign.getMixer().addEventListener("finished", (event) => {
      //   if (event.action === stopSign) {
      //     stopSign.fadeOut(0.5);
      //     dance.reset().fadeIn(0.5).play();
      //     setCurrentAnimation("dance");
      //   }
      // });
    }
  }, [isColliding, actions]);

  React.useEffect(() => {
    if (
      currentAnimation === "stumble" &&
      actions["stumble"].isRunning() === true
    ) {
      setTimeout(() => {
        gsap.to(group.current.position, {
          duration: 2.0,
          y: group.current.position.y - 0.6,
          z: group.current.position.z - 0.7,
        });
      }, 500);
    }
  }, [currentAnimation]);
  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group
          name="ch_charlotte_rig_main"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <group name="ch_charlotte_srf_geo" />
          <group name="scale_reference" scale={0.943}>
            <group name="charlotteRig_Reference">
              <primitive
                object={nodes.charlotteRig_Hips}
                characterRef={characterRef}
              />
              <group name="ch_charlotte_srf_head" />
              <group name="Mesh" />
              <group name="Mesh001" />
              <group name="Mesh002" />
              <skinnedMesh
                name="Mesh003"
                geometry={nodes.Mesh003.geometry}
                material={materials.charlotteHeadMat}
                skeleton={nodes.Mesh003.skeleton}
                morphTargetDictionary={nodes.Mesh003.morphTargetDictionary}
                morphTargetInfluences={nodes.Mesh003.morphTargetInfluences}
              />
              <group name="ch_charlotte_eyeL_mesh">
                <skinnedMesh
                  name="Mesh001_1"
                  geometry={nodes.Mesh001_1.geometry}
                  material={materials.corneaMat}
                  skeleton={nodes.Mesh001_1.skeleton}
                />
                <skinnedMesh
                  name="Mesh001_2"
                  geometry={nodes.Mesh001_2.geometry}
                  material={materials.eyeMat}
                  skeleton={nodes.Mesh001_2.skeleton}
                />
              </group>
              <group name="ch_charlotte_eyeR_mesh">
                <skinnedMesh
                  name="Mesh002_1"
                  geometry={nodes.Mesh002_1.geometry}
                  material={materials.corneaMat}
                  skeleton={nodes.Mesh002_1.skeleton}
                />
                <skinnedMesh
                  name="Mesh002_2"
                  geometry={nodes.Mesh002_2.geometry}
                  material={materials.eyeMat}
                  skeleton={nodes.Mesh002_2.skeleton}
                />
              </group>
              <skinnedMesh
                name="ch_charlotte_srf_main"
                geometry={nodes.ch_charlotte_srf_main.geometry}
                material={materials.charlotteBodyMat}
                skeleton={nodes.ch_charlotte_srf_main.skeleton}
                morphTargetDictionary={
                  nodes.ch_charlotte_srf_main.morphTargetDictionary
                }
                morphTargetInfluences={
                  nodes.ch_charlotte_srf_main.morphTargetInfluences
                }
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("src/assets/charlotte.glb");
