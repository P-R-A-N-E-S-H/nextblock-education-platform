import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, ArrowRight, Volume2, VolumeX, Eye } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [introStep, setIntroStep] = useState(0); // 0: single block, 1: multiplying, 2: assembling, 3: logo reveal
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 4, 30);
    pointLight1.position.set(0, 0, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 3, 30);
    pointLight2.position.set(5, 5, 2);
    scene.add(pointLight2);

    // Create 3D Blocks with glass materials
    const blockGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.75,
      thickness: 0.8,
      ior: 1.45,
      transparent: true,
      opacity: 0.85,
    });

    const edgeGeometry = new THREE.EdgesGeometry(blockGeometry);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
    });

    // 1. Central Core Block
    const centralGroup = new THREE.Group();
    const centralMesh = new THREE.Mesh(blockGeometry, glassMaterial);
    const centralEdge = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    centralGroup.add(centralMesh, centralEdge);
    centralGroup.scale.set(0.01, 0.01, 0.01);
    scene.add(centralGroup);

    // 2. Surrounding Swarm Blocks
    const count = 48;
    const blocks: {
      group: THREE.Group;
      initialPos: THREE.Vector3;
      targetPos: THREE.Vector3;
      speed: number;
      rotSpeed: THREE.Vector3;
    }[] = [];

    // Form an ascending logo staircase target
    for (let i = 0; i < count; i++) {
      const g = new THREE.Group();
      const m = new THREE.Mesh(blockGeometry, glassMaterial.clone());
      const e = new THREE.LineSegments(edgeGeometry, edgeMaterial);
      g.add(m, e);

      // Random scattered starting position in sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 16 + 6;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const initialPos = new THREE.Vector3(x, y, z);
      g.position.copy(initialPos);
      g.scale.set(0, 0, 0);

      // Target position: Geometric staircase formation
      const stepIndex = i % 4;
      const subX = (stepIndex - 1.5) * 1.6 + (Math.floor(i / 4) % 3 - 1) * 0.4;
      const subY = (stepIndex - 1.5) * 1.2 + (Math.floor(i / 12) - 1) * 0.4;
      const subZ = (stepIndex - 1.5) * 0.8;
      const targetPos = new THREE.Vector3(subX, subY, subZ);

      scene.add(g);
      blocks.push({
        group: g,
        initialPos,
        targetPos,
        speed: Math.random() * 0.02 + 0.01,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04
        ),
      });
    }

    // Background floating dust particles
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(180 * 3);
    for (let i = 0; i < 180 * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 30;
      particlePos[i + 1] = (Math.random() - 0.5) * 30;
      particlePos[i + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Animation Timing
    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // State 0 to 1: Central block expands and pulses (0s - 2s)
      if (elapsed < 2.0) {
        const scale = Math.min(1.8, elapsed * 1.2);
        centralGroup.scale.set(scale, scale, scale);
        centralGroup.rotation.x = elapsed * 0.6;
        centralGroup.rotation.y = elapsed * 0.8;
        camera.position.z = 18 - elapsed * 2.5;
        if (introStep === 0 && elapsed > 1.2) setIntroStep(1);
      } 
      // State 1 to 2: Surrounding blocks spawn and float in (2s - 4.5s)
      else if (elapsed < 4.8) {
        const t = (elapsed - 2.0) / 2.8;
        centralGroup.rotation.x = elapsed * 0.4;
        centralGroup.rotation.y = elapsed * 0.5;

        blocks.forEach((b, idx) => {
          const delay = (idx / count) * 0.8;
          const blockT = Math.max(0, Math.min(1, (t - delay) * 1.5));
          b.group.scale.set(blockT, blockT, blockT);
          b.group.position.lerpVectors(b.initialPos, b.targetPos, blockT);
          b.group.rotation.x += b.rotSpeed.x;
          b.group.rotation.y += b.rotSpeed.y;
        });

        camera.position.z = 13 - t * 3;
        camera.position.y = Math.sin(t * Math.PI) * 1.5;
        if (introStep < 2 && elapsed > 3.0) setIntroStep(2);
      } 
      // State 2 to 3: Blocks converge into logo staircase (4.8s+)
      else {
        const t = Math.min(1, (elapsed - 4.8) / 1.5);
        blocks.forEach((b) => {
          b.group.position.lerp(b.targetPos, 0.08);
          b.group.rotation.x += b.rotSpeed.x * 0.3;
          b.group.rotation.y += b.rotSpeed.y * 0.3;
        });

        scene.rotation.y = Math.sin(elapsed * 0.3) * 0.2;
        scene.rotation.x = Math.cos(elapsed * 0.3) * 0.1;
        if (introStep < 3) setIntroStep(3);
      }

      particles.rotation.y = elapsed * 0.02;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleEnterExperience = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-6 sm:p-12 transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Top Header Tag */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono font-black uppercase text-cyan-300 tracking-widest">
            3D CINEMATIC PROLOGUE
          </span>
        </div>

        <button
          onClick={handleEnterExperience}
          className="px-4 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all backdrop-blur-md"
        >
          Skip to Platform →
        </button>
      </div>

      {/* Central Dramatic Title Overlay */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 pointer-events-none">
        {introStep >= 1 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-black uppercase tracking-widest backdrop-blur-md animate-in zoom-in-90 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>EVERY DECISION IS A BLOCK</span>
          </div>
        )}

        {introStep >= 2 && (
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[1.05] animate-in slide-in-from-bottom-4 duration-700">
            BUILD YOUR FUTURE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
              ONE BLOCK AT A TIME.
            </span>
          </h1>
        )}

        {introStep >= 3 && (
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-slate-300 uppercase max-w-xl mx-auto animate-in fade-in duration-700">
            CAREER → COURSE → COLLEGE → ADMISSION → FUTURE
          </p>
        )}
      </div>

      {/* Bottom CTA Button */}
      <div className="relative z-10 animate-fade-in">
        <button
          onClick={handleEnterExperience}
          className="px-9 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-widest shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/60 transition-all duration-300 hover:scale-105 flex items-center gap-3 border border-white/40"
        >
          <span>ENTER NEXTBLOCK 3D WORLD</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
