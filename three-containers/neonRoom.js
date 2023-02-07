import * as THREE from "three";
import React, { Suspense, useRef, lazy } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import StatsUtils from "../three-components/stats";
import Controls from "../three-components/controls";
import { Structure } from "../three-components/neonRoom";

const Bloom = lazy(() => import("../three-shaders/bloom"));

const NeonRoom = (props) => {
  return (
    <>
      <Canvas
        camera={{
          fov: 100,
          position: [150, 0, 300],
        }}
        style={{
          height: "100%",
          width: "100%",
          background: "#000",
          position: "fixed",
          // filter: 'invert(1)'
        }}
        // orthographic
      >
        <Suspense fallback={null}>
          <ambientLight color={0xffffff} intensity={1} />
          <Structure width={300} height={80} depth={160} />
        </Suspense>
        <Suspense fallback={null}>
          <Bloom intensity={0.5} />
        </Suspense>
        <Suspense fallback={null}>
          {/* <StatsUtils /> */}
          <Controls />
        </Suspense>
      </Canvas>
    </>
  );
};

export default NeonRoom;
