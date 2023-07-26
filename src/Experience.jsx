import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  useAnimations,
  OrbitControls,
} from "@react-three/drei";

import Korus from "./Korus";
import { useheadPositionStore } from "./store";
import Splines from "./Splines";
import FlipAnimator from "./PlainAnimator";
import TextureAnimator from "./TextureAnimator";

export default function Experience() {
  const cube = useRef();
  const korus = useGLTF("./echo_lowpoly_anims_04_withoutBall.glb");
  const actions = useAnimations(korus.animations, korus.scene);

  const { posX, posY, posZ } = useheadPositionStore();

  useFrame((state, delta) => {
    state.camera.lookAt(0, 1.1, 0);
  });

  useEffect(() => {
    const action = actions.actions.Welcome_01;
    action.play();
  }, []);

  return (
    <>
      <OrbitControls makeDefault />
      <Environment preset="night" />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position-y={-0.2} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <Korus />
      <Splines />
      <FlipAnimator IconPosition={[2, 2, 0]} IconSize={[1.8, 1.8, 0.1]} />

      <TextureAnimator
        tilesHoriz={8}
        tilesVert={8}
        numTiles={64}
        tileDispDuration={60}
        visible={true}
        position={[posX, posY + 0.5, posZ + 0.8]}
      />
    </>
  );
}
