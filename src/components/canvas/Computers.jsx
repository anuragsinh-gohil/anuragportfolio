import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={1.5} groundColor='black' />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1000}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.66  : 0.75}
        position={isMobile ? [0, -5, -1] : [0, -3, -1]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [cameraSettings, setCameraSettings] = useState({ position: [20, 3, 5], fov: 25 });

  useEffect(() => {
    const updateCameraSettings = () => {
      if (window.innerWidth <= 767) {
        setCameraSettings({ position: [20, 3, 5], fov: 50 });
      } else if (window.innerWidth <= 1023) {
        setCameraSettings({ position: [20, 3, 5], fov: 38 });
      } else {
        setCameraSettings({ position: [20, 3, 5], fov: 25 });
      }
    };

    updateCameraSettings();
    window.addEventListener("resize", updateCameraSettings);

    return () => {
      window.removeEventListener("resize", updateCameraSettings);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={cameraSettings}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}> 
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={cameraSettings.fov === 50} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;