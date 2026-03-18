'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrubEngine } from './ScrubEngine';
import { vertexShader, fragmentShader } from './TunnelShader';
import Link from 'next/link';
import Image from 'next/image';
import SlotAvailabilityWidget from '../../_components/SlotAvailabilityWidget';
import { Shimmer } from "@/src/components/ai-elements/shimmer";

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
            batchSize: 4, // Load initial 4 frames for quick start
            onProgress: (p) => setProgress(p),
            onInitLoad: () => {
                // Start experience as soon as initial batch is ready
                setIsLoading(false);
                initScroll();
            },
            onLoadComplete: () => {
                console.log('All frames fully loaded in background');
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

        // Animation Loop & Viewport Optimization
        let animationFrameId: number;
        let isVisible = true; // Assume visible initially

        // ⚡ Bolt: Pause WebGL rendering when hero is off-screen to save CPU/GPU
        const observer = new IntersectionObserver((entries) => {
            const wasVisible = isVisible;
            isVisible = entries[0].isIntersecting;

            // Restart animation loop when scrolling back into view
            if (isVisible && !wasVisible) {
                animate();
            }
        }, { threshold: 0 });

        observer.observe(containerRef.current);

        const animate = () => {
            if (!isVisible) return; // Halt loop when off-screen
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
            observer.disconnect();
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
                priority={true}
                sizes="100vw"
                className={`object-cover object-top transition-opacity duration-1000 ${isLoading ? 'opacity-50' : 'opacity-0'}`}
            />

            {/* Loading Indicator */}
            {/* 🫀 CWV Sentinel Fix: Lower z-index to z-30 (below text's z-40) to prevent black overlay/blur from blocking LCP text paint */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/50 backdrop-blur-sm">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[var(--color-primary-500)] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                        <Shimmer className="text-lg text-[var(--color-primary-300)] font-medium">{`Loading Experience... ${Math.round(progress * 100)}%`}</Shimmer>
                    </div>
                </div>
            )}

            {/* Overlay Content */}
            <div className={`absolute bottom-0 left-0 w-full p-10 pb-20 z-40 transition-opacity duration-1000`}>
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-2xl md:text-4xl font-serif italic text-[var(--color-text-secondary)] mb-2">
                        Advancing Minimally Invasive Spine & Brain Surgery
                    </h2>
                    <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-8">
                        Expert Neurosurgery & Spine Care
                    </h1>
                    
                    <div className="max-w-md mb-8">
                        <SlotAvailabilityWidget />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="#contact"
                            className="bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-700)] text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
                            aria-label="Book Consultation"
                        >
                            Book Consultation
                        </Link>
                        <Link
                            href="/services"
                            className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:border-[var(--color-border)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]"
                            aria-label="View Procedures"
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
