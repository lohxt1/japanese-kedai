import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree, useResource } from '@react-three/fiber';

const Cube = (props) => {
	const {
		position,
		rotation,
		width = 10,
		height = 10,
		depth = 10,
		wireframe = false,
		color
	} = props;
	// const [xRef, xObject] = useResource();

	const { size } = useThree();

	const geom = new THREE.BoxBufferGeometry(width, height, depth);

	useFrame((state, delta) => {
		// if (xRef.current) {
		// 	xRef.current.rotation.x += 0.003;
		// }
	});

	if (geom !== undefined) {
		return (
			<group position={position || [0, 0, 0]} rotation={rotation}>
				<lineSegments
					// ref={xRef}
					// position={[0, 0, height / (2 * Math.tan((25 * Math.PI) / 180)) - 254]}
					position={[0, 0, 0]}
				>
					<edgesGeometry attach="geometry" args={[geom]} />
					<lineBasicMaterial attach="material" color={color} />
				</lineSegments>
			</group>
		);
	}
	return null;
};

export default Cube;
