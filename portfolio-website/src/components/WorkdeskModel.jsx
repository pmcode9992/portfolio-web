"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";

// Component for the Wall Background
const WallBackground = () => {
  const wallTexture = useTexture("/textures/wall.jpg");

  return (
    <mesh position={[0, 5, 6]}>
      <planeGeometry args={[20, 10]} />
      <meshBasicMaterial map={wallTexture} />
    </mesh>
  );
};

// Component for the Floor
const Floor = () => {
  const floorTexture = useTexture("/textures/wall.jpg");

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 15.5]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial map={floorTexture} />
    </mesh>
  );
};

const WorkdeskModel = () => {
  const { scene } = useGLTF("/models/StandingDesk.glb");
  scene.rotation.y = Math.PI; // Rotate the desk to face the camera

  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 50 }}
      style={{ width: "100%", height: "100vh" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Background Wall */}
      <WallBackground />

      {/* Floor under the Desk */}
      <Floor />

      {/* Desk Model */}
      <primitive object={scene} />

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2} // Restricts going below the floor
        minPolarAngle={Math.PI / 4} // Restricts upward movement (limits the upward angle)
        minAzimuthAngle={-Math.PI / 6} // Restricts left movement
        maxAzimuthAngle={Math.PI / 6} // Restricts right movement
      />
    </Canvas>
  );
};

export default WorkdeskModel;
