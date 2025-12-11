"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Neural network / AI-inspired particle system
function NeuralParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const particleCount = 120;
  
  const { positions, connections } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const connectionIndices: number[] = [];
    
    // Create particles in a spherical distribution
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 2 + Math.random() * 1.5;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    // Create connections between nearby particles
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < 1.5 && connectionIndices.length < 400) {
          connectionIndices.push(i, j);
        }
      }
    }
    
    const linePositions = new Float32Array(connectionIndices.length * 3);
    for (let i = 0; i < connectionIndices.length; i++) {
      const idx = connectionIndices[i];
      linePositions[i * 3] = positions[idx * 3];
      linePositions[i * 3 + 1] = positions[idx * 3 + 1];
      linePositions[i * 3 + 2] = positions[idx * 3 + 2];
    }
    
    return { positions, connections: linePositions };
  }, []);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.03) * 0.2;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = clock.elapsedTime * 0.05;
      linesRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.03) * 0.2;
    }
  });
  
  return (
    <group>
      {/* Particles (neurons) */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#00ffff"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      {/* Connections (synapses) */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
        />
      </lineSegments>
      
      {/* Core glow sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10 h-screen w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <NeuralParticles />
      </Canvas>
      
      {/* Gradient overlays for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-smooth-black" />
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient" />
    </div>
  );
}
