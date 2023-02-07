import * as THREE from 'three';

const NeonRoomMaterial = new THREE.ShaderMaterial({
	uniforms: {
		uColor: {
			value: new THREE.Vector3(
				Math.random() - 0.5,
				Math.random() - 0.5,
				Math.random() - 0.5
			)
		}
	},
	vertexShader: `
        varying vec2 vUv;
        varying vec3 vVertex;
        uniform vec3 uColor;

        void main() {

            vUv = uv;

            vVertex = ( modelViewMatrix * vec4( position, 1. ) ).xyz;
        
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 1. );
        }
	`,
	fragmentShader: `
        varying vec2 vUv;
        varying vec3 vVertex;
        uniform vec3 uColor;

        void main() {
            // calculcate the normal vectors
            vec3 N = normalize( cross( dFdx( vVertex ), dFdy( vVertex ) ) );
        
            // arbitrary direction of the light
            const vec3 lightDir = vec3( 1., 0., -1. ); // og
        
            // normalize that as well
            vec3 L = normalize( lightDir );
        
            //------------- our purple color ------ no negative numbers ---
            vec3 diffuse = vec3( vUv.y + uColor.x, vUv.x + uColor.y, vUv.x + uColor.z ) * max( dot( N, -L ), 1.0 ); // og
        
            gl_FragColor = vec4( diffuse, 0.2 );
        }
	`,
	depthWrite: true,
	// depthTest: false,
	transparent: true,
	// wireframe: true,
	side: THREE.DoubleSide
});

export { NeonRoomMaterial };
