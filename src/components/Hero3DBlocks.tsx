import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  GraduationCap, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  Phone, 
  Award, 
  Building2, 
  Zap,
  CheckCircle2,
  Maximize2,
  Compass,
  Briefcase,
  Star,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OWNER_WHATSAPP_NUMBER, ADMISSIONS_HELPLINE_PHONE } from '../services/emailService';

type ViewerPersona = 'student' | 'parent' | 'career';

interface LandmarkInfo {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  stats: string;
  color: string;
  icon: string;
}

const LANDMARKS: Record<string, LandmarkInfo> = {
  academic: {
    id: 'academic',
    name: 'Premier Autonomous Campus Tower',
    badge: 'TNEA Top Tier-1',
    tagline: 'Anna University (CEG/MIT), PSG Tech, CIT & SSN Excellence',
    stats: '195+ Cutoff Target • NIRF Top 50 Ranked',
    color: '#06b6d4',
    icon: '🏛️'
  },
  placement: {
    id: 'placement',
    name: '₹40 LPA Career Launchpad',
    badge: 'Dream Placements',
    tagline: 'Global Tech Giants & Product Development Hubs',
    stats: '₹8.5L – ₹40L CTC • 98.4% Placement Record',
    color: '#10b981',
    icon: '🚀'
  },
  ai_lab: {
    id: 'ai_lab',
    name: 'AI, CSE & Quantum Computing Lab',
    badge: 'Next-Gen Engineering',
    tagline: 'Artificial Intelligence, Robotics, VLSI & Cyber Security',
    stats: '40+ High-Demand Tech Specializations',
    color: '#8b5cf6',
    icon: '💻'
  },
  parent_trust: {
    id: 'parent_trust',
    name: 'Parent Trust & 7.5% Free Quota Hub',
    badge: '100% Transparency',
    tagline: 'Zero Capitation Fee, Strict Anti-Ragging & Safe Hostels',
    stats: '100% Free Tuition for 7.5% Govt School Students',
    color: '#f59e0b',
    icon: '🛡️'
  },
  global_hub: {
    id: 'global_hub',
    name: 'TNEA Single Window Choice Center',
    badge: 'Rank Strategy',
    tagline: 'Anna University Multi-Round Upward Movement Matrix',
    stats: 'Curated 50+ Safe Choice Locking Strategy',
    color: '#3b82f6',
    icon: '🎯'
  }
};

export const Hero3DBlocks: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { setCurrentPublicView } = useApp();
  
  const [activePersona, setActivePersona] = useState<ViewerPersona>('student');
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkInfo>(LANDMARKS.academic);
  const [isHovering3D, setIsHovering3D] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Atmosphere Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.022);

    // 2. Camera Setup (Cinematic Isometric View)
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8.5, 18.5);
    camera.lookAt(0, 1.2, 0);

    // 3. WebGL Renderer with High-Fidelity Tone Mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    container.appendChild(renderer.domElement);

    // 4. Vibrant Cyber Multi-Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const cyanSpot = new THREE.PointLight(0x06b6d4, 6.0, 45);
    cyanSpot.position.set(6, 12, 8);
    scene.add(cyanSpot);

    const emeraldSpot = new THREE.PointLight(0x10b981, 5.0, 35);
    emeraldSpot.position.set(-6, 8, -4);
    scene.add(emeraldSpot);

    const purpleSpot = new THREE.PointLight(0xa855f7, 4.5, 35);
    purpleSpot.position.set(4, 9, -6);
    scene.add(purpleSpot);

    const goldSpot = new THREE.PointLight(0xf59e0b, 3.5, 25);
    goldSpot.position.set(-5, 4, 6);
    scene.add(goldSpot);

    // =========================================================================
    // 5. 3D CAMPUS METAVERSE & INTERACTIVE ARCHITECTURAL CITADEL
    // =========================================================================
    const metaverseGroup = new THREE.Group();
    scene.add(metaverseGroup);

    // A. Luminous Dual-Ring Floating Cyber Platform
    const platformGeo = new THREE.CylinderGeometry(7.2, 7.8, 0.45, 64);
    const platformMat = new THREE.MeshPhysicalMaterial({
      color: 0x070b14,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const platformMesh = new THREE.Mesh(platformGeo, platformMat);
    platformMesh.position.y = -1.2;
    metaverseGroup.add(platformMesh);

    // Concentric Neon Halo Rings
    const createHaloRing = (radius: number, color: number, y: number) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.05, radius + 0.05, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = y;
      metaverseGroup.add(ring);
      return ring;
    };

    const halo1 = createHaloRing(6.5, 0x06b6d4, -0.96);
    const halo2 = createHaloRing(4.8, 0x3b82f6, -0.95);
    const halo3 = createHaloRing(2.8, 0x10b981, -0.94);
    const halo4 = createHaloRing(1.2, 0xf59e0b, -0.93);

    // Interactive Landmark Object Registry for Hover Detection
    const interactiveObjects: { mesh: THREE.Object3D; data: LandmarkInfo }[] = [];

    // Helper: Build High-Tech Architectural Landmark
    const createLandmarkBuilding = (
      w: number, h: number, d: number,
      x: number, y: number, z: number,
      primaryColor: number,
      emissiveColor: number,
      landmarkData: LandmarkInfo
    ) => {
      const group = new THREE.Group();
      group.position.set(x, y + h / 2, z);

      // 1. Exterior Glass Pillar
      const boxGeo = new THREE.BoxGeometry(w, h, d);
      const boxMat = new THREE.MeshPhysicalMaterial({
        color: primaryColor,
        roughness: 0.1,
        metalness: 0.25,
        transmission: 0.6,
        thickness: 0.9,
        ior: 1.5,
        transparent: true,
        opacity: 0.9,
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      group.add(box);

      // 2. Luminous Neon Wireframe Edges
      const wireGeo = new THREE.EdgesGeometry(boxGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.75,
      });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      group.add(wire);

      // 3. Inner Pulsating Power Core
      const coreGeo = new THREE.BoxGeometry(w * 0.7, h * 0.88, d * 0.7);
      const coreMat = new THREE.MeshBasicMaterial({
        color: emissiveColor,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      metaverseGroup.add(group);
      interactiveObjects.push({ mesh: group, data: landmarkData });
      return { group, core };
    };

    // 1. CENTRAL PREMIER UNIVERSITY CITADEL (Anna Univ / PSG / CIT / SSN)
    const centralTower = createLandmarkBuilding(2.6, 4.2, 2.6, 0, -1.0, 0, 0x0284c7, 0x38bdf8, LANDMARKS.academic);
    const centralTop = createLandmarkBuilding(1.8, 2.2, 1.8, 0, 3.2, 0, 0x06b6d4, 0x06b6d4, LANDMARKS.academic);

    // Glowing Summit Hologram Dome
    const domeGeo = new THREE.SphereGeometry(0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.8,
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    domeMesh.position.set(0, 5.4, 0);
    metaverseGroup.add(domeMesh);

    // Beacon Light at summit
    const beaconGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.set(0, 6.2, 0);
    metaverseGroup.add(beaconMesh);

    // 2. RIGHT SATELLITE: ₹40 LPA CAREER LAUNCHPAD TOWER (Emerald Glow)
    const careerTower = createLandmarkBuilding(1.6, 4.5, 1.6, 3.6, -1.0, -0.8, 0x10b981, 0x34d399, LANDMARKS.placement);
    const careerSpire = createLandmarkBuilding(0.9, 1.2, 0.9, 3.6, 3.5, -0.8, 0x059669, 0x6ee7b7, LANDMARKS.placement);

    // 3. LEFT SATELLITE: AI, CSE & SEMICONDUCTOR LAB (Purple Neon)
    const aiLab = createLandmarkBuilding(1.8, 3.2, 1.8, -3.6, -1.0, 0.8, 0x7c3aed, 0xa855f7, LANDMARKS.ai_lab);
    const aiCap = createLandmarkBuilding(1.2, 0.9, 1.2, -3.6, 2.2, 0.8, 0x9333ea, 0xc084fc, LANDMARKS.ai_lab);

    // 4. FRONT-LEFT: PARENT TRUST & 7.5% GOVT SCHOLARSHIP PAVILION (Gold Aura)
    const parentVault = createLandmarkBuilding(1.6, 2.2, 1.6, -2.6, -1.0, -2.8, 0xd97706, 0xfbbf24, LANDMARKS.parent_trust);

    // 5. FRONT-RIGHT: TNEA ADMISSION & RANK CHOICE MATRIX (Blue Neon)
    const tneaMatrix = createLandmarkBuilding(1.6, 2.6, 1.6, 2.8, -1.0, 2.6, 0x2563eb, 0x60a5fa, LANDMARKS.global_hub);

    // B. Floating Holographic Quantum Core (Orbiting Diamond at Top)
    const quantumCoreGeo = new THREE.OctahedronGeometry(0.55, 0);
    const quantumCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true
    });
    const quantumCore = new THREE.Mesh(quantumCoreGeo, quantumCoreMat);
    quantumCore.position.set(0, 7.2, 0);
    metaverseGroup.add(quantumCore);

    // C. Orbiting Gyroscopic Energy Bands
    const bandGeo1 = new THREE.TorusGeometry(5.2, 0.04, 16, 100);
    const bandMat1 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.45 });
    const gyroBand1 = new THREE.Mesh(bandGeo1, bandMat1);
    gyroBand1.rotation.x = Math.PI / 3.5;
    scene.add(gyroBand1);

    const bandGeo2 = new THREE.TorusGeometry(6.4, 0.04, 16, 100);
    const bandMat2 = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.4 });
    const gyroBand2 = new THREE.Mesh(bandGeo2, bandMat2);
    gyroBand2.rotation.x = -Math.PI / 4;
    gyroBand2.rotation.y = Math.PI / 5;
    scene.add(gyroBand2);

    // D. Orbiting Cyber Satellites with Glowing Trails
    const satelliteItems = [
      { r: 4.6, sp: 0.55, y: 3.2, color: 0x38bdf8, size: 0.24 },
      { r: 5.8, sp: -0.42, y: 4.5, color: 0x34d399, size: 0.28 },
      { r: 6.4, sp: 0.35, y: 1.8, color: 0xfbbf24, size: 0.22 },
      { r: 4.0, sp: -0.65, y: 0.8, color: 0xc084fc, size: 0.20 },
    ];

    const satellites: { mesh: THREE.Mesh; r: number; sp: number; y: number }[] = [];
    satelliteItems.forEach((sat) => {
      const geo = new THREE.SphereGeometry(sat.size, 16, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: sat.color,
        emissive: sat.color,
        emissiveIntensity: 0.9,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      satellites.push({ mesh, r: sat.r, sp: sat.sp, y: sat.y });
    });

    // E. 250 Ascending Cyber Sparks (Dual Archimedean Helix Constellation)
    const sparkCount = 180;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount * 3; i += 3) {
      sparkPositions[i] = (Math.random() - 0.5) * 16;
      sparkPositions[i + 1] = Math.random() * 10 - 1.2;
      sparkPositions[i + 2] = (Math.random() - 0.5) * 16;
    }

    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.09,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    metaverseGroup.add(sparks);

    // =========================================================================
    // 6. Interactive Mouse Raycasting & Smooth Inertial Orbit
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.006;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        mouseX = x * 0.3;
        mouseY = y * 0.2;
      }
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera dampening
      if (!isDragging) {
        targetRotY += (mouseX - targetRotY) * 0.04;
        targetRotX += (mouseY - targetRotX) * 0.04;
      }

      metaverseGroup.rotation.y = elapsed * 0.12 + targetRotY;
      metaverseGroup.rotation.x = targetRotX * 0.4;

      // Pulse beacon and quantum core
      const pulse = 1.0 + Math.sin(elapsed * 3.5) * 0.1;
      beaconMesh.scale.set(pulse, pulse, pulse);
      quantumCore.rotation.y = elapsed * 1.2;
      quantumCore.rotation.x = elapsed * 0.8;

      // Rotate ground halo rings
      halo1.rotation.z = elapsed * 0.07;
      halo2.rotation.z = -elapsed * 0.09;
      halo3.rotation.z = elapsed * 0.05;
      halo4.rotation.z = -elapsed * 0.08;

      // Rotate Gyroscopic Bands
      gyroBand1.rotation.z = elapsed * 0.12;
      gyroBand2.rotation.z = -elapsed * 0.15;

      // Orbiting Cyber Satellites
      satellites.forEach(({ mesh, r, sp, y }, idx) => {
        const angle = elapsed * sp + idx * 1.6;
        mesh.position.set(
          Math.cos(angle) * r,
          y + Math.sin(elapsed * 2.5 + idx) * 0.35,
          Math.sin(angle) * r
        );
      });

      // Float upward firefly sparks
      const posArray = sparkGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < sparkCount * 3; i += 3) {
        posArray[i] += 0.02;
        if (posArray[i] > 9.0) {
          posArray[i] = -1.2;
        }
      }
      sparkGeo.attributes.position.needsUpdate = true;

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
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[660px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovering3D(true)}
      onMouseLeave={() => setIsHovering3D(false)}
    >
      
      {/* 1. Three.js High-Fidelity Canvas Container */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" 
        title="Click and drag to explore the 3D Campus in 360°"
      />

      {/* 2. Top Persona Filter Tabs (Students vs Parents vs Placements) */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-center z-20">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/90 backdrop-blur-xl border-2 border-slate-800 shadow-2xl shadow-blue-500/10">
          
          <button
            onClick={() => {
              setActivePersona('student');
              setSelectedLandmark(LANDMARKS.academic);
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activePersona === 'student'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-cyan-300" />
            <span>Student Mode</span>
          </button>

          <button
            onClick={() => {
              setActivePersona('parent');
              setSelectedLandmark(LANDMARKS.parent_trust);
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activePersona === 'parent'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>Parent Trust</span>
          </button>

          <button
            onClick={() => {
              setActivePersona('career');
              setSelectedLandmark(LANDMARKS.placement);
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activePersona === 'career'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-slate-950" />
            <span>₹40 LPA Placement</span>
          </button>
        </div>
      </div>

      {/* 3. Floating 3D Interactive Hotspot Chips */}
      <div className="absolute top-16 left-4 z-10 hidden sm:flex flex-col gap-2 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 border border-cyan-400/40 backdrop-blur-md shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-black text-cyan-300">🏛️ Top Tier-1 Autonomous Campus</span>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 border border-emerald-400/40 backdrop-blur-md shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-black text-emerald-300">💼 ₹40 LPA Tech Placement Spire</span>
        </div>
      </div>

      <div className="absolute top-16 right-4 z-10 hidden sm:flex flex-col gap-2 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 border border-amber-400/40 backdrop-blur-md shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-black text-amber-300">🛡️ 100% Free 7.5% Govt School Quota</span>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 border border-purple-400/40 backdrop-blur-md shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          <span className="text-[11px] font-black text-purple-300">💻 AI, Robotics & Semiconductor Hub</span>
        </div>
      </div>

      {/* 4. 360° Drag & Explore Notice */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 text-[10px] font-bold backdrop-blur-md flex items-center gap-1.5 opacity-80">
          <Compass className="w-3 h-3 text-cyan-400 animate-spin" />
          <span>360° Interactive 3D Metaverse • Drag to Rotate</span>
        </span>
      </div>

      {/* 5. Dynamic Hologram Card (Changes with Persona & Sector) */}
      <div className="absolute bottom-3 left-4 right-4 z-20">
        <div className="bg-slate-950/95 border-2 border-slate-800 backdrop-blur-2xl rounded-3xl p-4 sm:p-5 shadow-2xl transition-all duration-300">
          
          {/* STUDENT PERSONA */}
          {activePersona === 'student' && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    TNEA 2026 Cutoff Strategy
                  </span>
                  <span className="text-xs font-black text-white">Target Your Dream College</span>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  Match your 12th PCM marks against CEG, PSG, CIT, SSN, KCT & SKCET closing cutoffs for Round 1 upward movement.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => {
                    setCurrentPublicView('mock-allotment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/30 hover:scale-105 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Simulate Seat Allotment →</span>
                </button>
              </div>
            </div>
          )}

          {/* PARENT PERSONA */}
          {activePersona === 'parent' && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Parent Peace of Mind
                  </span>
                  <span className="text-xs font-black text-white">100% Anna University Affiliation & Zero Hidden Fees</span>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  Verified NAAC A++ accreditations, strict anti-ragging residential hostels, First Graduate fee waivers & 100% free 7.5% Govt School scheme.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <a
                  href={`tel:${ADMISSIONS_HELPLINE_PHONE.replace(/\s+/g, '')}`}
                  className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:scale-105"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Direct Parent Helpline: {ADMISSIONS_HELPLINE_PHONE}</span>
                </a>
              </div>
            </div>
          )}

          {/* CAREER PERSONA */}
          {activePersona === 'career' && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    High-Salary Tech Careers
                  </span>
                  <span className="text-xs font-black text-white">₹8.5 LPA to ₹40 LPA Starting Salaries</span>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  98.4% campus placement rates with Tier-1 recruiters: Zoho, Cisco, Amazon, Microsoft, Bosch, Caterpillar & Cognizant.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => {
                    setCurrentPublicView('colleges');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/30 hover:scale-105 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>View 123+ College Placements →</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
