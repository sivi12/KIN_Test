/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 src/assets/charlottee.glb 
*/

import React, { useEffect, useRef, useState } from "react";
import { useGraph, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";
import { extractPositionDataFromClip } from "../helper-functions/extractPositionDataFromClip";
import { removeXZPositionFromClip } from "../helper-functions/removeXZPositionFromClip";
import { syncPosition } from "../helper-functions/syncPosition";
import { rotateAnimation } from "../helper-functions/rotateAnimation";

export function Charlottee({
  characterRef,
  isColliding,
  isCollidingFromBehind,
  distance,
}) {
  const { camera } = useThree();
  const group = React.useRef();
  const { scene, animations: loadedAnimations } = useGLTF(
    "src/assets/charlottee.glb"
  );
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions, mixer } = useAnimations(loadedAnimations, group);

  const [currentAnimation, setCurrentAnimation] = useState("danceOne");

  //__________________________________________________________________________________________________________
  const savedPositions = useRef(null);

  React.useEffect(() => {
    if (!savedPositions.current) {
      console.log(loadedAnimations);
      savedPositions.current = {
        backwards: extractPositionDataFromClip(loadedAnimations[0]),
        danceOne: extractPositionDataFromClip(loadedAnimations[1], true),
        forward: extractPositionDataFromClip(loadedAnimations[2], true),
        sidewards: extractPositionDataFromClip(loadedAnimations[3], true),
      };

      removeXZPositionFromClip(loadedAnimations[0], true, false, true);
      removeXZPositionFromClip(loadedAnimations[1], true, false, true);
      removeXZPositionFromClip(loadedAnimations[2], true, false, true);
      removeXZPositionFromClip(loadedAnimations[3], true, false, true);

      console.log("Saved positions:", savedPositions.current);
    }
  }, [loadedAnimations]);

  //__________________________________________________________________________________________________________

  React.useEffect(() => {
    const dance = actions["DanceOne"];
    const backwards = actions["Backwards"];
    backwards.loop = THREE.LoopOnce;
    backwards.clampWhenFinished = true;
    const forward = actions["Forward"];
    forward.loop = THREE.LoopOnce;
    forward.clampWhenFinished = true;
    const sidewards = actions["Sidewards"];
    sidewards.loop = THREE.LoopOnce;
    sidewards.clampWhenFinished = true;

    if (!dance.isRunning()) {
      console.log(loadedAnimations);
      dance.play();
    }

    // if (isColliding && dance.isRunning() === true) {
    //   setCurrentAnimation("backwards");

    //   setTimeout(() => {
    //     dance.fadeOut(0.5);
    //     backwards.reset().fadeIn(0.5).play();
    //   }, 50);

    //   mixer.addEventListener("finished", (event) => {
    //     if (event.action === backwards) {
    //       backwards.fadeOut(0.5);
    //       dance.reset().fadeIn(0.5).play();
    //       setCurrentAnimation("danceOne");
    //     }
    //   });
    // }

    if (isColliding && dance.isRunning() && mixer.time > 5) {
      setCurrentAnimation("forward");
      console.log(mixer);
      console.log(actions["DanceOne"].time);
      setTimeout(() => {
        dance.fadeOut(0.5);
        forward.reset().fadeIn(0.5).play();
      }, 50);

      mixer.addEventListener("finished", (event) => {
        if (event.action === forward) {
          forward.stop();
          dance.reset().fadeIn(0.5).play();

          setCurrentAnimation("danceOne");
        }
      });
    }

    // if (isCollidingFromBehind && dance.isRunning() === true) {
    //   setCurrentAnimation("forward");

    //   setTimeout(() => {
    //     group.current.rotation.y += Math.PI; // 180 Grad (im Bogenmaß)
    //     dance.fadeOut(0.5);
    //     forward.reset().fadeIn(0.5).play();
    //   }, 50);

    //   mixer.addEventListener("finished", (event) => {
    //     group.current.rotation.y -= Math.PI; // 180 Grad (im Bogenmaß)
    //     if (event.action === forward) {
    //       forward.stop();
    //       dance.reset().fadeIn(0.5).play();

    //       setCurrentAnimation("danceOne");
    //     }
    //   });
    // }
  }, [isColliding, isCollidingFromBehind, actions]);

  const currentAnimationRef = useRef(currentAnimation);

  React.useEffect(() => {
    currentAnimationRef.current = currentAnimation; // Aktuellen Wert dynamisch aktualisieren
  }, [currentAnimation]);

  React.useEffect(() => {
    setTimeout(() => {
      if (
        currentAnimation === "backwards" &&
        actions["Backwards"].isRunning()
      ) {
        syncPosition(
          savedPositions.current.backwards,
          group,
          "backwards",
          currentAnimationRef
        );
      }
    }, 50);

    if (currentAnimation === "danceOne" && actions["DanceOne"].isRunning()) {
      syncPosition(
        savedPositions.current.danceOne,
        group,
        "danceOne",
        currentAnimationRef
      );
    }

    // setTimeout(() => {
    //   if (currentAnimation === "forward" && actions["Forward"].isRunning()) {
    //     syncPosition(
    //       savedPositions.current.forward,
    //       group,
    //       "forward",
    //       currentAnimationRef
    //     );
    //   }
    // }, 50);
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
              <primitive object={nodes.charlotteRig_Hips} ref={characterRef} />
              <group name="ch_charlotte_srf_head" />
              <group name="Mesh" />
              <group name="Mesh001" />
              <skinnedMesh
                name="Mesh002"
                geometry={nodes.Mesh002.geometry}
                material={materials.charlotteHeadMat}
                skeleton={nodes.Mesh002.skeleton}
                morphTargetDictionary={nodes.Mesh002.morphTargetDictionary}
                morphTargetInfluences={nodes.Mesh002.morphTargetInfluences}
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

useGLTF.preload("src/assets/charlottee.glb");
