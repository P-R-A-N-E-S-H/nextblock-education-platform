import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Globe2, MapPin, Award, GraduationCap, DollarSign, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { scrollToSection } from '../utils/helpers';

interface DestinationData {
  id: string;
  name: string;
  flag: string;
  lat: number;
  lng: number;
  popularCourses: string[];
  topUniversities: string[];
  tuitionRange: string;
  scholarships: string;
  postStudyWork: string;
  color: number;
}

const destinations: DestinationData[] = [
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    lat: 38.8951,
    lng: -77.0364,
    popularCourses: ['Computer Science & AI', 'MBA & Finance', 'Data Engineering', 'Biomedical'],
    topUniversities: ['Stanford', 'MIT', 'Harvard', 'UC Berkeley', 'CMU'],
    tuitionRange: '$35,000 – $60,000 / yr',
    scholarships: 'Need-Blind & Merit Grants up to 100%',
    postStudyWork: '3 Years STEM OPT Extension',
    color: 0x3b82f6
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    lat: 51.5074,
    lng: -0.1278,
    popularCourses: ['Economics & Finance', 'AI & Computing', 'Law', 'Data Science'],
    topUniversities: ['Oxford', 'Cambridge', 'Imperial College', 'UCL', 'LSE'],
    tuitionRange: '£22,000 – £38,000 / yr',
    scholarships: 'Chevening, Commonwealth & Faculty Awards',
    postStudyWork: '2-Year Graduate Route Visa',
    color: 0x60a5fa
  },
  {
    id: 'germany',
    name: 'Germany & Europe',
    flag: '🇩🇪',
    lat: 52.5200,
    lng: 13.4050,
    popularCourses: ['Automotive & Robotics', 'Mechanical Eng', 'Informatics', 'Clean Tech'],
    topUniversities: ['TU Munich (TUM)', 'RWTH Aachen', 'Heidelberg', 'TU Berlin'],
    tuitionRange: '€0 – €3,000 / yr (Virtually Free Tuition)',
    scholarships: 'DAAD & Deutschlandstipendium',
    postStudyWork: '18-Month Job Search Visa + EU Blue Card',
    color: 0x06b6d4
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    lat: 45.4215,
    lng: -75.6972,
    popularCourses: ['Applied Sciences', 'Business Analytics', 'Software Engineering', 'BioTech'],
    topUniversities: ['Univ of Toronto', 'UBC', 'McGill', 'Waterloo'],
    tuitionRange: 'CAD $28,000 – $52,000 / yr',
    scholarships: 'Lester B. Pearson & Faculty Grants',
    postStudyWork: '3-Year Post-Graduation Work Permit (PGWP)',
    color: 0x38bdf8
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    lat: -35.2809,
    lng: 149.1300,
    popularCourses: ['Information Technology', 'Commerce & CPA', 'Civil Engineering', 'Healthcare'],
    topUniversities: ['Univ of Melbourne', 'UNSW Sydney', 'Univ of Sydney', 'ANU'],
    tuitionRange: 'AUD $34,000 – $48,000 / yr',
    scholarships: 'Australia Awards & Group of 8 Merit Aid',
    postStudyWork: '2 to 4-Year Post-Study Work Visa',
    color: 0x10b981
  },
  {
    id: 'uae',
    name: 'UAE (Dubai & Abu Dhabi)',
    flag: '🇦🇪',
    lat: 25.2048,
    lng: 55.2708,
    popularCourses: ['Global Business', 'Aviation & Logistics', 'Computer Science', 'Hospitality'],
    topUniversities: ['NYU Abu Dhabi', 'Heriot-Watt Dubai', 'Univ of Wollongong Dubai'],
    tuitionRange: 'AED 50,000 – 95,000 / yr',
    scholarships: 'Global Talent Grants & 50% Tuition Waivers',
    postStudyWork: 'Green Visa & Golden Visa pathways',
    color: 0xf59e0b
  }
];

const indiaOrigin = {
  name: 'India (Origin)',
  lat: 20.5937,
  lng: 78.9629
};

// Helper: Convert Lat/Lng to 3D Cartesian coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Helper: Create 3D curved trajectory arc between two points
function createArcCurve(p1: THREE.Vector3, p2: THREE.Vector3, elevationRatio: number = 0.35) {
  const distance = p1.distanceTo(p2);
  const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  const midLength = midPoint.length();
  midPoint.normalize();
  midPoint.multiplyScalar(midLength + distance * elevationRatio);

  const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
  return curve;
}

interface UniversityGlobe3DProps {
  onOpenBooking: () => void;
}

export const UniversityGlobe3D: React.FC<UniversityGlobe3DProps> = ({ onOpenBooking }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeDestination, setActiveDestination] = useState<DestinationData>(destinations[0]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const globeRadius = 4.0;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 12.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const blueLight = new THREE.PointLight(0x2563eb, 3, 30);
    blueLight.position.set(8, 8, 8);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2, 30);
    cyanLight.position.set(-8, -4, 6);
    scene.add(cyanLight);

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Dark Sphere Surface
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a101d,
      roughness: 0.8,
      metalness: 0.1,
      clearcoat: 0.3,
      transparent: true,
      opacity: 0.95
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // 2. Wireframe / Latitude Longitude Grid
    const wireGeo = new THREE.SphereGeometry(globeRadius + 0.02, 36, 18);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // 3. Atmosphere Glow Ring
    const atmosGeo = new THREE.RingGeometry(globeRadius + 0.05, globeRadius + 1.2, 64);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosMesh);

    // 4. Dot Grid Landmass Simulation
    const dotCount = 900;
    const dotPositions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      const lat = (Math.random() - 0.5) * 160;
      const lng = (Math.random() - 0.5) * 360;
      const pt = latLngToVector3(lat, lng, globeRadius + 0.04);
      dotPositions[i * 3] = pt.x;
      dotPositions[i * 3 + 1] = pt.y;
      dotPositions[i * 3 + 2] = pt.z;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.05,
      transparent: true,
      opacity: 0.4
    });
    const dotMesh = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotMesh);

    // 5. Origin Marker (India)
    const originPos = latLngToVector3(indiaOrigin.lat, indiaOrigin.lng, globeRadius + 0.08);
    const originPinGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const originPinMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const originPin = new THREE.Mesh(originPinGeo, originPinMat);
    originPin.position.copy(originPos);
    globeGroup.add(originPin);

    // 6. Destination Pins & Glowing Arcs
    destinations.forEach((dest) => {
      const destPos = latLngToVector3(dest.lat, dest.lng, globeRadius + 0.08);

      // Pin
      const pinGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: dest.color });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(destPos);
      globeGroup.add(pin);

      // Pin Pulsing Ring
      const ringGeo = new THREE.RingGeometry(0.12, 0.2, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: dest.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(destPos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);

      // Arc Trajectory
      const curve = createArcCurve(originPos, destPos, 0.4);
      const points = curve.getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: dest.color,
        transparent: true,
        opacity: 0.6,
        linewidth: 2
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);
    });

    // Mouse Drag Rotation Physics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0.002 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;

      rotationVelocity = { x: deltaY * 0.002, y: deltaX * 0.002 };
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Idle Rotation
      if (!isDragging) {
        globeGroup.rotation.y += 0.0025;
      }

      atmosMesh.rotation.z = elapsed * 0.05;

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
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-dark-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Globe2 className="w-4 h-4 text-cyan-400" />
            <span>Interactive 3D Study Globe</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5">
            YOUR WORLD OF <br />
            <span className="text-gradient-cyan">OPPORTUNITIES.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Drag the 3D globe to explore global admission hubs, post-study work routes, and verified scholarship pathways connected directly to you.
          </p>
        </div>

        {/* Destination Quick-Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setActiveDestination(dest)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeDestination.id === dest.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105 border border-blue-400'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700/80'
              }`}
            >
              <span>{dest.flag}</span>
              <span>{dest.name}</span>
            </button>
          ))}
        </div>

        {/* 3D Globe + Glass Detail Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3D Globe Viewport */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] lg:h-[560px] bg-slate-900/60 rounded-3xl border border-slate-800 backdrop-blur-md overflow-hidden flex items-center justify-center">
            <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
            
            {/* Overlay Instructions */}
            <div className="absolute top-4 left-4 pointer-events-none z-10">
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-900/90 text-cyan-300 border border-slate-700/80 backdrop-blur-md shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Click & Drag to Rotate 3D Globe
              </span>
            </div>

            <div className="absolute bottom-4 left-4 pointer-events-none z-10 flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Direct Flight & Admission Arcs from India</span>
            </div>
          </div>

          {/* Right Column: Interactive Destination Glass Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative animate-in fade-in duration-300">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeDestination.flag}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{activeDestination.name}</h3>
                    <p className="text-xs text-cyan-400 font-semibold">Tier-1 Study Destination</p>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Global Hub
                </span>
              </div>

              {/* Data Grid */}
              <div className="space-y-4 text-xs mb-6">
                {/* Popular Programs */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-400" /> Popular Disciplines:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDestination.popularCourses.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-medium border border-slate-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top Universities */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Top Institutions:
                  </p>
                  <p className="text-white font-semibold">{activeDestination.topUniversities.join(' • ')}</p>
                </div>

                {/* Tuition & Visa in 2-cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Estimated Tuition</span>
                    <span className="text-cyan-300 font-bold text-xs mt-0.5 block">{activeDestination.tuitionRange}</span>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Post-Study Visa</span>
                    <span className="text-emerald-400 font-bold text-xs mt-0.5 block">{activeDestination.postStudyWork}</span>
                  </div>
                </div>

                {/* Scholarships */}
                <div className="bg-blue-950/60 p-3.5 rounded-xl border border-blue-800/60 flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-blue-300 block">Scholarships & Aid</span>
                    <span className="text-xs text-slate-200 font-medium">{activeDestination.scholarships}</span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollToSection('universities')}
                  className="flex-1 py-3.5 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/25 text-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Universities in {activeDestination.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
