import * as THREE from 'three';

const CharacterMaterial = new THREE.ShaderMaterial({
	uniforms: {
		ogTexture: { type: 't', value: undefined },
		uColor: {
			value: new THREE.Vector3(Math.random(), Math.random(), Math.random())
		}
	},
	vertexShader: `
	  varying vec2 vUv;
      uniform vec3 uColor;
	  void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	  }
	`,
	fragmentShader: `
	  varying vec2 vUv;
      uniform vec3 uColor;
	  uniform sampler2D ogTexture;
  
      void main() {
        vec2 uv = vUv;
        vec4 color = vec4(uColor.x + vUv.x, uColor.y + vUv.y, uColor.z + vUv.x, 1.0);
        float texValue = texture2D(ogTexture, uv).a;
        gl_FragColor = mix(gl_FragColor, color, texValue);
    }
	`,
	depthWrite: false,
	depthTest: false,
	transparent: true,
	side: THREE.DoubleSide
});

export { CharacterMaterial };
