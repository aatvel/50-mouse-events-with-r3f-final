import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  meshBounds,
  useGLTF,
  useAnimations,
  OrbitControls,
} from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useheadPositionStore } from "./store";

export default function Korus() {
  const korus = useGLTF("./echo_lowpoly_anims_04_withoutBall.glb");
  const actions = useAnimations(korus.animations, korus.scene);
  const [headbonePosition, setHeadbonePosition] = useState([0, 0, 0]);

  const { changeHeadPosX, changeHeadPosY, changeHeadPosZ } =
    useheadPositionStore();

  useFrame((state, delta) => {
    const headbone = korus.scene.getObjectByName("Head");
    if (headbone) {
      const position = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      position.setFromMatrixPosition(headbone.matrixWorld);
      setHeadbonePosition([position.x, position.y, position.z]);

      changeHeadPosX(position.x);
      changeHeadPosY(position.y);
      changeHeadPosZ(position.z);
    }
  });

  useEffect(() => {
    const action = actions.actions.Welcome_01;
    action.play();
  }, []);

  return (
    <>
      <primitive object={korus.scene} scale={0.7} position-y={0} />
    </>
  );
}
