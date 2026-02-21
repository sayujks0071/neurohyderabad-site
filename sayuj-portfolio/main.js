import { ScrubEngine } from './scrubEngine.js';
import { vertexShader, fragmentShader } from './tunnelShader.js';

// Configuration
const CONFIG = {
    imagePath: 'Model image/', // Ensure this matches your folder name
    imagePrefix: 'ezgif-frame-',
    totalFrames: 190, // Update this if you have a different count
    scrollDuration: '150%', // 1.5x viewport height
};

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    1,
    1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('webgl-container').appendChild(renderer.domElement);

// Material & Geometry
const uniforms = {
    map: { value: null },
    progress: { value: 0 },
    distortionStrength: { value: 0.1 } // Subtle distortion
};

const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Resize Handler
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Update orthographic camera frustum
    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / -2;
    camera.updateProjectionMatrix();

    // Update geometry size
    plane.geometry.dispose();
    plane.geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
});

// Scrub Engine
const scrubEngine = new ScrubEngine({
    path: CONFIG.imagePath,
    prefix: CONFIG.imagePrefix,
    totalFrames: CONFIG.totalFrames,
    onProgress: (percent) => {
        // Optional: Show loading bar
        console.log(`Loading... ${Math.round(percent * 100)}%`);
    },
    onLoadComplete: () => {
        console.log('Assets loaded. Starting animation.');
        initScroll();
    }
});

function initScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // We create a timeline that is scrubbed by scroll
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: `+=${CONFIG.scrollDuration}`, // Pin for this duration
            scrub: 0.5, // Smooth scrubbing
            pin: true,
            // markers: true // Debug markers
        }
    });

    // The timeline tweens a generic object which we watch in the update loop
    // Or simpler: update uniforms directly here? 
    // Actually, ScrubEngine needs to be queried every frame based on progress.

    // We can use a proxy object to tween 'progress' from 0 to 1
    let proxy = { progress: 0 };

    tl.to(proxy, {
        progress: 1,
        ease: "none",
        onUpdate: () => {
            // Update texture
            const frame = scrubEngine.getFrame(proxy.progress);
            if (frame) {
                if (!uniforms.map.value) {
                    const texture = new THREE.CanvasTexture(frame);
                    uniforms.map.value = texture;
                } else {
                    // Update existing texture source
                    // Keeping the same texture object is better for memory, just update image
                    uniforms.map.value.image = frame;
                    uniforms.map.value.needsUpdate = true;
                }
            }

            // Update shader uniforms
            uniforms.progress.value = proxy.progress;
        }
    });

    // Animate loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

// Start loading
scrubEngine.preload();
