"use client";

import { useEffect, useRef, useMemo } from "react";
import { italiana } from "@/lib/fonts";
import { cn } from "@/utils/helpers";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Sacred Geometry Bloom - Symmetrical, Harmonious, Technological
// Represents mental wellness through lotus-inspired sacred geometry
function SacredBloom() {
  const groupRef = useRef<THREE.Group>(null);
  const petalRefs = useRef<THREE.Mesh[]>([]);
  const ringsRef = useRef<THREE.Group>(null);
  
  const petalCount = 8;
  const ringCount = 3;
  
  // Create petal geometry (teardrop/lotus petal shape)
  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Draw a symmetrical petal shape
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.3, 0.2, 0.4, 0.8, 0, 1.2);
    shape.bezierCurveTo(-0.4, 0.8, -0.3, 0.2, 0, 0);
    
    const extrudeSettings = {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);
  
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    
    if (groupRef.current) {
      // Slow, meditative rotation
      groupRef.current.rotation.y = t * 0.15;
    }
    
    // Animate petals - gentle breathing bloom
    petalRefs.current.forEach((petal, i) => {
      if (petal) {
        const phase = (i / petalCount) * Math.PI * 2;
        const breathe = 1 + Math.sin(t * 0.4 + phase) * 0.08;
        petal.scale.setScalar(breathe);
        
        // Subtle petal rotation
        const baseRotation = (i / petalCount) * Math.PI * 2;
        petal.rotation.z = baseRotation + Math.sin(t * 0.3 + phase) * 0.05;
      }
    });
    
    // Animate orbital rings
    if (ringsRef.current) {
      ringsRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.2) * 0.1;
      ringsRef.current.rotation.z = t * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Central core - glowing sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {/* Lotus petals - arranged in sacred geometry pattern */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * Math.PI * 2;
        const x = Math.cos(angle) * 0.5;
        const z = Math.sin(angle) * 0.5;
        
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) petalRefs.current[i] = el; }}
            geometry={petalGeometry}
            position={[x, 0, z]}
            rotation={[Math.PI / 2, 0, angle]}
            scale={0.8}
          >
            <meshStandardMaterial
              color="#00ffff"
              emissive="#006666"
              emissiveIntensity={0.3}
              roughness={0.3}
              metalness={0.6}
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
      
      {/* Orbital rings - technological element */}
      <group ref={ringsRef}>
        {Array.from({ length: ringCount }).map((_, i) => {
          const scale = 1.5 + i * 0.5;
          const opacity = 0.3 - i * 0.08;
          
          return (
            <mesh key={i} rotation={[Math.PI / 2 + i * 0.2, i * 0.3, 0]} scale={scale}>
              <torusGeometry args={[1, 0.01, 16, 100]} />
              <meshBasicMaterial
                color="#00ffff"
                transparent
                opacity={opacity}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Ambient particles - floating around the bloom */}
      <FloatingParticles />
    </group>
  );
}

// Floating particles for ambient effect
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 50;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 2 + Math.random() * 1.5;
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.1;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full px-6 py-32 text-smooth-white md:px-16 md:py-48"
    >
      {/* Section header */}
      <div className="mb-24 flex flex-col items-center justify-center md:mb-32">
        <span className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
          Featured Project
        </span>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">
          Selected Works
        </h2>
      </div>

      {/* Aramito Feature */}
      <div
        ref={contentRef}
        className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row md:gap-20"
      >
        {/* 3D Visualization - Sacred Bloom */}
        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950/30 to-teal-950/30 md:h-[600px] md:w-1/2">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-5, -5, -5]} intensity={0.4} color="#00ffff" />
            <SacredBloom />
          </Canvas>
          
          {/* Overlay gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-smooth-black/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-col items-start md:w-1/2">
          <h3
            className={cn(
              italiana.className,
              "mb-6 text-5xl text-primary md:text-7xl lg:text-8xl"
            )}
          >
            Aramito
          </h3>

          <p className="mb-8 text-base font-light leading-relaxed text-gray-400 md:text-lg md:leading-loose">
            Transforming mental healthcare with AI. A comprehensive platform
            connecting users with 24/7 AI therapy, professional therapist
            appointments, and personalized wellness insights.
          </p>

          <div className="mb-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-primary/30 px-4 py-2 text-xs uppercase tracking-wider text-gray-400">
              AI Therapy
            </span>
            <span className="rounded-full border border-primary/30 px-4 py-2 text-xs uppercase tracking-wider text-gray-400">
              Mental Wellness
            </span>
            <span className="rounded-full border border-primary/30 px-4 py-2 text-xs uppercase tracking-wider text-gray-400">
              24/7 Support
            </span>
            <span className="rounded-full border border-primary/30 px-4 py-2 text-xs uppercase tracking-wider text-gray-400">
              Persian-First
            </span>
          </div>

          <a
            href="https://www.aramito.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden border border-primary/50 px-8 py-4 text-xs uppercase tracking-[0.2em] transition-all hover:border-primary"
          >
            <span className="relative z-10 transition-colors group-hover:text-smooth-black">
              Visit Aramito
            </span>
            <div className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        </div>
      </div>
    </section>
  );
}


