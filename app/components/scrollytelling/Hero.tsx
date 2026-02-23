'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrubEngine } from './ScrubEngine';
import { vertexShader, fragmentShader } from './TunnelShader';
import Link from 'next/link';
import Image from 'next/image';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        // Configuration
        const CONFIG = {
            totalFrames: 190,
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
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
        containerRef.current.appendChild(renderer.domElement);

        // Material & Geometry
        const uniforms = {
            map: { value: null as THREE.Texture | null },
            progress: { value: 0 },
            distortionStrength: { value: 0.1 }
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

        // Scrub Engine
        const scrubEngine = new ScrubEngine({
            totalFrames: CONFIG.totalFrames,
            onProgress: (p) => setProgress(p),
            onLoadComplete: () => {
                setIsLoading(false);
                initScroll();
            }
        });

        // Resize Handler
        const handleResize = () => {
            if (!containerRef.current) return;

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
        };

        window.addEventListener('resize', handleResize);

        // Animation Loop
        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Scroll Logic
        let timeline: gsap.core.Timeline;

        function initScroll() {
            timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${CONFIG.scrollDuration}`,
                    scrub: 0.5,
                    pin: true,
                }
            });

            const proxy = { progress: 0 };

            timeline.to(proxy, {
                progress: 1,
                ease: "none",
                onUpdate: () => {
                    const frame = scrubEngine.getFrame(proxy.progress);
                    if (frame) {
                        if (!uniforms.map.value) {
                            const texture = new THREE.CanvasTexture(frame);
                            uniforms.map.value = texture;
                        } else {
                            uniforms.map.value.image = frame;
                            uniforms.map.value.needsUpdate = true;
                        }
                    }
                    uniforms.progress.value = proxy.progress;
                }
            });
        }

        // Start Loading
        scrubEngine.preload();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);

            if (timeline) timeline.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());

            scrubEngine.dispose();

            if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }

            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
            <Image
                src="/images/dr-sayuj-krishnan-portrait-sm.jpg"
                alt="Dr. Sayuj Krishnan"
                fill
                priority
                className={`object-cover object-top transition-opacity duration-1000 ${isLoading ? 'opacity-50' : 'opacity-0'}`}
            />

            {/* Loading Indicator */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                        <p className="text-lg text-blue-400 font-medium">Loading Experience... {Math.round(progress * 100)}%</p>
                    </div>
                </div>
            )}

            {/* Overlay Content */}
            <div className={`absolute bottom-0 left-0 w-full p-10 pb-20 z-10 transition-opacity duration-1000`}>
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-2xl md:text-4xl font-serif italic text-gray-400 mb-2">
                        Advancing Minimally Invasive Surgery
                    </h2>
                    <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-8">
                        Dr. Sayuj Krishnan:<br />German-Trained Neurosurgeon in Hyderabad
                    </h1>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="#contact"
                            className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
                        >
                            Book Consultation
                        </Link>
                        <Link
                            href="/services"
                            className="px-8 py-3 border border-white text-white font-semibold rounded hover:bg-white/10 transition-colors"
                        >
                            View Procedures
                        </Link>
                    </div>
                </div>
            </div>

            {/* Canvas Container */}
            <div className="absolute inset-0 z-0 pointer-events-none" />
        </section>
    );
}
