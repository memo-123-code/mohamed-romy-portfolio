"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ParticleNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const isHoveringCard = useRef(false);
  const speedMulti = useRef(1);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const particleCount = 120;
  const maxDistance = 1.8;
  const size = 12;

  const { particles, positions, colors, linesGeometry } = useMemo(() => {
    const particles = [];
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorCyan = new THREE.Color("#00f3ff");
    const colorPurple = new THREE.Color("#b026ff");

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * size;
      const y = (Math.random() - 0.5) * size;
      const z = (Math.random() - 0.5) * size;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particles.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        )
      });

      const mixedColor = colorCyan.clone().lerp(colorPurple, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const linesGeometry = new THREE.BufferGeometry();
    
    return { particles, positions, colors, linesGeometry };
  }, []);

  useEffect(() => {
    const handleHover = (e: Event) => {
      const customEvent = e as CustomEvent;
      isHoveringCard.current = customEvent.detail.isHovered;
    };
    
    const handleScroll = () => {
      isScrolling.current = true;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };

    window.addEventListener('cardHover', handleHover);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('cardHover', handleHover);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current || !groupRef.current) return;
    
    // Only throttle on desktop to prevent massive frame drops, allow smooth mobile animation
    if (typeof window !== 'undefined' && window.innerWidth > 768 && isScrolling.current) return;

    const positionsAttr = pointsRef.current.geometry.attributes.position;
    
    for (let i = 0; i < particleCount; i++) {
      positionsAttr.setXYZ(
        i,
        positionsAttr.getX(i) + particles[i].velocity.x,
        positionsAttr.getY(i) + particles[i].velocity.y,
        positionsAttr.getZ(i) + particles[i].velocity.z
      );

      if (Math.abs(positionsAttr.getX(i)) > size / 2) particles[i].velocity.x *= -1;
      if (Math.abs(positionsAttr.getY(i)) > size / 2) particles[i].velocity.y *= -1;
      if (Math.abs(positionsAttr.getZ(i)) > size / 2) particles[i].velocity.z *= -1;
    }
    
    positionsAttr.needsUpdate = true;

    const linePositions = [];
    const lineColors = [];
    const colorAttr = pointsRef.current.geometry.attributes.color;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positionsAttr.getX(i) - positionsAttr.getX(j);
        const dy = positionsAttr.getY(i) - positionsAttr.getY(j);
        const dz = positionsAttr.getZ(i) - positionsAttr.getZ(j);
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          linePositions.push(
            positionsAttr.getX(i), positionsAttr.getY(i), positionsAttr.getZ(i),
            positionsAttr.getX(j), positionsAttr.getY(j), positionsAttr.getZ(j)
          );

          // Closer = more opaque
          const alpha = Math.max(0, 1.0 - Math.sqrt(distSq) / maxDistance);
          
          lineColors.push(
            colorAttr.getX(i), colorAttr.getY(i), colorAttr.getZ(i), alpha * 0.5,
            colorAttr.getX(j), colorAttr.getY(j), colorAttr.getZ(j), alpha * 0.5
          );
        }
      }
    }

    linesRef.current.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    linesRef.current.geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(lineColors, 4)
    );
    
    // Interactive Pulse Logic
    const targetSpeedMulti = isHoveringCard.current ? 4 : 1;
    speedMulti.current += (targetSpeedMulti - speedMulti.current) * 0.05;
    
    const targetScale = isHoveringCard.current ? 1.05 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    
    // Slow rotation and interaction
    groupRef.current.rotation.y += 0.001 * speedMulti.current;
    groupRef.current.rotation.x += 0.0005 * speedMulti.current;
    
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={1.0}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

export default function NeuralBackground() {
  // We use pointerEvents: 'none' to allow clicks to pass through to the actual site
  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none transform-gpu will-change-transform" style={{ width: '100vw', height: '100vh', display: 'block' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]} style={{ display: 'block', width: '100vw', height: '100vh' }}>
        <fog attach="fog" args={["#050505", 3, 12]} />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
