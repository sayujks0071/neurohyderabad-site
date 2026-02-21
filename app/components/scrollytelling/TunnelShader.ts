export const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
uniform sampler2D map;
uniform float progress;
uniform float distortionStrength;
varying vec2 vUv;

void main() {
    vec2 p = vUv - 0.5;
    
    // Simple radial distortion
    // Strength increases with scroll progress if desired, or keep constant
    float dist = length(p);
    float factor = 1.0 + dist * distortionStrength * sin(progress * 3.14);
    
    vec2 uv = p * factor + 0.5;
    
    // Check bounds
    if(uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        // Discard or show black
         gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        gl_FragColor = texture2D(map, uv);
    }
}
`;
