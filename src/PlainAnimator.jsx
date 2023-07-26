import * as THREE from "three";
import React, { useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { PlainAnimator } from "three-plain-animator/lib/plain-animator";

export default function FlipAnimator({ IconPosition, IconSize }) {
  const texture01 = useLoader(THREE.TextureLoader, "/flipBook/anim1_front.png");
  const texture02 = useLoader(THREE.TextureLoader, "/flipBook/anim2_front.png");
  const texture03 = useLoader(THREE.TextureLoader, "/flipBook/anim3_front.png");

  const textures = [texture01, texture02, texture03];

  const [isAnimating, setIsAnimating] = useState(false);
  const [materialOpacity, setMaterialOpacity] = useState(0);
  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);
  const animatorRef = React.useRef();

  if (!animatorRef.current) {
    animatorRef.current = new PlainAnimator(textures[currentTextureIndex], 8, 8, 64, 15);
    animatorRef.current.currentFrame = 0;
  }

  const startAnimation = () => {
    const nextTextureIndex = Math.floor(Math.random() * textures.length);
    setCurrentTextureIndex(nextTextureIndex);
    animatorRef.current = new PlainAnimator(textures[nextTextureIndex], 8, 8, 64, 15);

    setIsAnimating(true);
    setMaterialOpacity(1);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    setMaterialOpacity(0);
    animatorRef.current.currentFrame = 0;
  };

  useFrame(() => {
    if (isAnimating) {
      animatorRef.current.animate();
    }
  });

  return (
    <>
      <mesh position={IconPosition}>
        <boxGeometry args={IconSize} />
        <meshStandardMaterial
          map={textures[currentTextureIndex]}
          transparent={true}
          color={"orange"}
          opacity={materialOpacity}
        />
      </mesh>

      <Html>
        <button className="buttonFlipOn" onClick={startAnimation}>
          Start Animation
        </button>
        <button className="buttonFlipOff" onClick={stopAnimation}>
          Stop Animation
        </button>
      </Html>
    </>
  );
}
