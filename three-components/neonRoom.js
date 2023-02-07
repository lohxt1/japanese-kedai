import * as THREE from "three";
import { useMemo, lazy } from "react";
import { NeonRoomMaterial } from "../three-shaders/neonroom";
import Cube from "./cube";
import { useLoader } from "@react-three/fiber";
import { RoundedBox, Cloud } from "@react-three/drei";
import { CharacterMaterial } from "../three-shaders/character";

const Character = (props) => {
  const {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    character,
    size = [40, 40],
    type = "1",
  } = props;
  const texture = useMemo(() => {
    let buffer = useLoader(THREE.TextureLoader, `../japanese/${type}.svg`);
    buffer.magFilter = THREE.NearestFilter;
    buffer.minFilter = THREE.LinearMipMapLinearFilter;
    return buffer;
  }, [character, type]);

  const clonedMaterial = useMemo(() => CharacterMaterial.clone(), []);

  return (
    <>
      <mesh position={position} rotation={rotation}>
        <planeBufferGeometry attach="geometry" args={size} />
        <shaderMaterial
          attach="material"
          args={[clonedMaterial]}
          uniforms-ogTexture-value={texture}
        />
      </mesh>
    </>
  );
};

const Structure = (props) => {
  const { width = 250, height = 150, depth = 160 } = props;

  const outerStructureDepthOffset = width / 10;
  const outerStructureWidthOffset = width / 10;

  const outerStructureWidth = width + outerStructureWidthOffset * 2;
  const outerStructureDepth = depth + outerStructureDepthOffset * 2;
  const outerStructureHeight = height / 3;

  const letterBoardWidth = height / 3 + 10;
  const letterBoardHeight = height / 3 + 10;
  const letterBoardDepth = width / 25;

  const clonedMaterial = useMemo(() => NeonRoomMaterial.clone(), []);

  return (
    <group>
      <Cloud scale={4} position={[120, 250, -120]} speed={1} segments={30} />
      <Cloud scale={3} position={[-120, 250, 120]} speed={1} segments={30} />
      <Cloud scale={5} position={[0, 250, 0]} speed={1} segments={30} />
      <Cloud scale={4} position={[50, 250, -50]} speed={1} segments={30} />
      <Cloud scale={3} position={[-50, 250, 50]} speed={1} segments={30} />

      {/* main neon room */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxBufferGeometry
          attach="geometry"
          args={[width, depth, height, 5, 5, 1]}
        />
        <shaderMaterial attach="material" args={[clonedMaterial]} />
      </mesh>

      {/* top wireframe */}
      <mesh
        position={[0, height / 2 + outerStructureHeight / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <boxBufferGeometry
          attach="geometry"
          args={[
            outerStructureWidth,
            outerStructureDepth,
            outerStructureHeight,
            5,
            5,
            1,
          ]}
        />
        <meshStandardMaterial
          attach="material"
          wireframe={true}
          color={0xffffff}
        />
      </mesh>

      {/* top inner wireframe */}
      <mesh
        position={[0, height / 2 + outerStructureHeight / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <boxBufferGeometry
          attach="geometry"
          args={[
            outerStructureWidth - 10,
            outerStructureDepth - 10,
            outerStructureHeight - 5,
            5,
            5,
            1,
          ]}
        />
        <meshStandardMaterial
          attach="material"
          wireframe={true}
          color={0x222222}
        />
      </mesh>

      {/* bottom wireframe */}
      <mesh
        position={[0, -(height / 2 + outerStructureHeight / 2), 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <boxBufferGeometry
          attach="geometry"
          args={[
            outerStructureWidth,
            outerStructureDepth,
            outerStructureHeight,
            5,
            5,
            1,
          ]}
        />
        <meshStandardMaterial
          attach="material"
          wireframe={true}
          color={0xffffff}
        />
      </mesh>

      {/* bottom inner wireframe */}
      <mesh
        position={[0, -(height / 2 + outerStructureHeight / 2), 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <boxBufferGeometry
          attach="geometry"
          args={[
            outerStructureWidth - 10,
            outerStructureDepth - 10,
            outerStructureHeight - 5,
            5,
            5,
            1,
          ]}
        />
        <meshStandardMaterial
          attach="material"
          wireframe={true}
          color={0x000000}
        />
      </mesh>

      {/* top cover for neon room */}
      <mesh position={[0, height / 2 + 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeBufferGeometry
          attach="geometry"
          args={[width - 5, depth - 5, 30, 30]}
        />
        <meshStandardMaterial
          attach="material"
          wireframe={true}
          color={0x000000}
        />
      </mesh>

      {/* right letter board */}
      <group
        position={[
          outerStructureWidth / 2 + letterBoardWidth / 2 + 10,
          height / 2 + outerStructureHeight / 2,
          depth / 2,
        ]}
      >
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 5 + 1).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 5 + 5).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 3 + 10).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 3 + 13).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 5 + 16).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 4 + 21).toString()}
        />
      </group>

      <RoundedBox
        args={[letterBoardWidth, letterBoardHeight, letterBoardDepth]}
        radius={letterBoardWidth / 10}
        smoothness={letterBoardWidth / 10 - 2}
        position={[
          outerStructureWidth / 2 + letterBoardWidth / 2 + 10,
          height / 2 + outerStructureHeight / 2,
          depth / 2,
        ]}
      >
        <meshPhongMaterial color="#f3f3f3" wireframe />
      </RoundedBox>

      {/* left letter board */}
      <group
        position={[
          -outerStructureWidth / 2 - letterBoardWidth / 2 + 10,
          -((letterBoardHeight - 10) / 2) - 5,
          depth / 2,
        ]}
      >
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 5 + 1).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 5 + 5).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 3 + 10).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 3 + 13).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 5 + 16).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 4 + 21).toString()}
        />
      </group>
      <group
        position={[
          -outerStructureWidth / 2 - letterBoardWidth / 2 + 10,
          (letterBoardHeight - 10) / 2 + 5,
          depth / 2,
        ]}
      >
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 5 + 1).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 5 + 5).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 3 + 10).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 3 + 13).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 5 + 16).toString()}
        />
        <Character
          size={[letterBoardHeight - 10, letterBoardHeight - 10]}
          type={parseInt(Math.random() * 4 + 21).toString()}
        />
      </group>
      <RoundedBox
        args={[letterBoardWidth, letterBoardHeight * 2, letterBoardDepth]}
        radius={letterBoardWidth / 10}
        smoothness={letterBoardWidth / 10 - 2}
        position={[
          -outerStructureWidth / 2 - letterBoardWidth / 2 + 10,
          0,
          depth / 2,
        ]}
      >
        <meshPhongMaterial color="#f3f3f3" wireframe />
      </RoundedBox>

      {/* main board characters */}
      <group
        position={[
          70,
          height / 2 + outerStructureHeight / 2,
          outerStructureDepth / 2,
        ]}
      >
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 5 + 1).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 5 + 5).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 3 + 10).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 3 + 13).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 5 + 16).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 4 + 21).toString()}
        />
      </group>
      <group
        position={[
          0,
          height / 2 + outerStructureHeight / 2,
          outerStructureDepth / 2,
        ]}
      >
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 5 + 1).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 5 + 5).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 3 + 10).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 3 + 13).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 5 + 16).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 4 + 21).toString()}
        />
      </group>
      <group
        position={[
          -70,
          height / 2 + outerStructureHeight / 2,
          outerStructureDepth / 2,
        ]}
      >
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 5 + 1).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 5 + 5).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 3 + 10).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 3 + 13).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 5 + 16).toString()}
        />
        <Character
          size={[outerStructureHeight, outerStructureHeight]}
          type={parseInt(Math.random() * 4 + 21).toString()}
        />
      </group>

      {/* room door */}
      <mesh
        position={[
          0,
          -(height / 2 - Math.max(50, height / 2) / 2),
          depth / 2 + 10,
        ]}
        rotation={[0, Math.PI / 100, 0]}
      >
        <planeBufferGeometry
          attach="geometry"
          args={[30, Math.max(50, height / 2), 30, 30]}
        />
        <meshStandardMaterial attach="material" color={0x000000} />
      </mesh>
      <mesh
        position={[
          0,
          -(height / 2 - Math.max(50, height / 2) / 2),
          depth / 2 + 11,
        ]}
        rotation={[0, Math.PI / 100, 0]}
      >
        <planeBufferGeometry
          attach="geometry"
          args={[30, Math.max(50, height / 2), 1, 1]}
        />
        <meshStandardMaterial
          attach="material"
          wireframe={true}
          color={0xffffff}
        />
      </mesh>

      {/* front room windows */}
      {Array.from({ length: 5 }).map((_, idx) => (
        <Cube
          position={[-100 + idx * 50, 0, depth / 2]}
          height={height}
          width={width / 5 + 5}
          depth={2}
        />
      ))}

      {/* back room windows */}
      {Array.from({ length: 5 }).map((_, idx) => (
        <Cube
          position={[-100 + idx * 50, 0, -depth / 2]}
          height={height}
          width={width / 5 + 5}
          depth={2}
        />
      ))}

      {/* right room windows */}
      {Array.from({ length: 3 }).map((_, idx) => (
        <Cube
          rotation={[0, Math.PI / 2, 0]}
          position={[width / 2, 0, -50 + idx * 50]}
          height={height}
          width={width / 5 + 5}
          depth={2}
        />
      ))}

      {/* left room windows */}
      {Array.from({ length: 3 }).map((_, idx) => (
        <Cube
          rotation={[0, Math.PI / 2, 0]}
          position={[-width / 2, 0, -50 + idx * 50]}
          height={height}
          width={width / 5 + 5}
          depth={2}
        />
      ))}
    </group>
  );
};

const Room = (props) => {
  return <></>;
};

export { Structure, Room };
