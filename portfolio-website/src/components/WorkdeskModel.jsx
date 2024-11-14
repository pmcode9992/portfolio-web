"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture, Text } from "@react-three/drei";
import { Vector3 } from "three";

const WallBackground = () => {
  const wallTexture = useTexture("/textures/wall.jpg");

  return (
    <mesh position={[0, 5, 5]}>
      <planeGeometry args={[20, 10]} />
      <meshBasicMaterial map={wallTexture} />
    </mesh>
  );
};

const Floor = () => {
  const floorTexture = useTexture("/textures/wall.jpg");

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 15]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial map={floorTexture} />
    </mesh>
  );
};

const WallText = () => {
  const bioText = `
    Hi, I'm Pranav Murthy
    I'm a software developer specializing in web applications
    and 3D experiences. I love building interactive interfaces
    and exploring the latest in tech. Welcome to my 3D workspace!
  `;

  return (
    <>
      <Text
        position={[0, 2, 5.1]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {bioText.trim()}
      </Text>
      <Text
        position={[0, 1.5, 6.52]}
        fontSize={0.05}
        color="red"
        anchorX="center"
        anchorY="middle"
      >
        Click here!
      </Text>
    </>
  );
};

// New Camera Control Component
const CameraControl = ({ targetRef }) => {
  const cameraRef = useRef();
  const [zoomToMonitor, setZoomToMonitor] = useState(false);
  const originalPosition = new Vector3(0, 2, 10);
  const monitorPosition = new Vector3(0, 1.5, 1);

  // Handle camera movement on click
  const handleClick = (event) => {
    const clickedObject = event.intersections[0]?.object;
    if (clickedObject === targetRef.current) {
      setZoomToMonitor(true);
    } else {
      setZoomToMonitor(false);
    }
  };

  // Smoothly animate camera position
  useFrame((state) => {
    const camera = state.camera;
    if (zoomToMonitor) {
      camera.position.lerp(monitorPosition, 0.1);
    } else {
      camera.position.lerp(originalPosition, 0.1);
    }
    camera.lookAt(0, 1, 0);
  });

  return null;
};

const WorkdeskModel = () => {
  const { scene } = useGLTF("/models/StandingDesk.glb");
  const monitorRef = useRef();

  scene.rotation.y = Math.PI;

  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 50 }}
      style={{ width: "100%", height: "100vh" }}
      onClick={(e) => e.stopPropagation()}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <WallBackground />
      <Floor />
      <WallText />

      {/* Desk Model */}
      <primitive object={scene}>
        {/* Clickable area for monitor */}
        <mesh
          ref={monitorRef}
          position={[-0.3, 1.4, -6.5]} // Adjust this position based on the actual monitor location
          scale={[0.45, 0.45, 0.1]} // Increase scale to make it large and visible
          onClick={() => window.open('https://github.com/pmcode9992', '_blank')}
        >
          <boxGeometry args={[2, 1, 0.2]} />{" "}
          {/* Increase size for visibility */}
          <meshBasicMaterial color="red" opacity={0} transparent={true} />
        </mesh>
      </primitive>

      {/* Camera Control with monitor reference */}
      <CameraControl targetRef={monitorRef} />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
      />
    </Canvas>
  );
};

export default WorkdeskModel;
