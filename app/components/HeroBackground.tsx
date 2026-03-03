"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Points, PointMaterial, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Define the custom shader for Data Flow
const DataFlowMaterial = shaderMaterial(
    {
        uTime: 0,
        uBaseColor: new THREE.Color('#777777')
    },
    // Vertex Shader
    `
    varying float vProgress;
    varying float vOffset;
    varying float vSpeed;
    varying vec3 vFlowColor;
    
    attribute float aProgress;
    attribute float aOffset;
    attribute float aSpeed;
    attribute vec3 aFlowColor;
    
    void main() {
        vProgress = aProgress;
        vOffset = aOffset;
        vSpeed = aSpeed;
        vFlowColor = aFlowColor;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform vec3 uBaseColor;
    
    varying float vProgress;
    varying float vOffset;
    varying float vSpeed;
    varying vec3 vFlowColor;
    
    void main() {
        // Base visibility 
        vec3 finalColor = uBaseColor;
        float alpha = 0.8; 

        // Data Packet Logic
        // We use a large cycle to reduce frequency (User request: "reduce much rate")
        // The packet only travels from 0 to 1, but the cycle is 15.0
        // So it's visible for ~1/15th of the time
        float cycleDuration = 15.0;
        
        float travel = uTime * vSpeed + vOffset;
        float packetPos = mod(travel, cycleDuration);
        
        // Calculate distance from current fragment to packet head
        float dist = vProgress - packetPos;
        
        float trailLength = 0.6; // Longer drag/trail
        
        float intensity = 0.0;
        
        if (dist <= 0.0 && dist > -trailLength) {
            // Normalized position within trail (0 at tail, 1 at head)
            float t = 1.0 - (abs(dist) / trailLength);
            // Linear fade for brighter trail (was pow 1.5)
            intensity = t; 
        }
        
        // Add glow using the random flow color
        if (intensity > 0.0) {
            // Overdrive the color for "neon" brightness
            vec3 brightFlowColor = vFlowColor * 4.0; 
            finalColor = mix(finalColor, brightFlowColor, intensity);
            
            // Boost alpha for the glow part to make it pop
            alpha = max(alpha, intensity);
        }

        gl_FragColor = vec4(finalColor, alpha);
    }
    `
);

extend({ DataFlowMaterial });

const ParticleNetwork = () => {
    const group = useRef<THREE.Group>(null);
    const lineMaterial = useRef<THREE.ShaderMaterial & { uTime?: number }>(null);

    const [particlesData] = React.useState(() => {
        const particleCount = 400;
        const maxDistance = 1.8;
        const maxConnections = 3;
        
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
            
            const brandColors = [
                new THREE.Color('#6F70DE'), // Purple
                new THREE.Color('#85EDAF'), // Green
                new THREE.Color('#78D4EF')  // Cyan
            ];

            // 1. Generate Particles
            for (let i = 0; i < particleCount; i++) {
                const x = (Math.random() - 0.5) * 12;
                const y = (Math.random() - 0.5) * 12;
                const z = (Math.random() - 0.5) * 10;
                
                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;

                const color = brandColors[Math.floor(Math.random() * brandColors.length)];
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;
            }

            // 2. Generate Connections
            const linePoints: number[] = [];
            const lineProgress: number[] = []; // 0 or 1
            const lineOffsets: number[] = []; // same for pair
            const lineSpeeds: number[] = []; // same for pair
            const lineFlowColors: number[] = []; // RGB for the flow

            for (let i = 0; i < particleCount; i++) {
                const x1 = positions[i * 3];
                const y1 = positions[i * 3 + 1];
                const z1 = positions[i * 3 + 2];

                let connections = 0;
                for (let j = i + 1; j < particleCount; j++) {
                    const x2 = positions[j * 3];
                    const y2 = positions[j * 3 + 1];
                    const z2 = positions[j * 3 + 2];

                    const distSq = (x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2;

                    if (distSq < maxDistance * maxDistance) {
                        linePoints.push(x1, y1, z1);
                        linePoints.push(x2, y2, z2);

                        // Direction 0 -> 1
                        lineProgress.push(0.0, 1.0);
                        
                        const offset = Math.random() * 50.0; // Large offset range for variety
                        const speed = 0.5 + Math.random() * 0.8; // Varied speeds
                        
                        lineOffsets.push(offset, offset);
                        lineSpeeds.push(speed, speed);

                        // Pick a random brand color for this line's flow
                        const brandColor = brandColors[Math.floor(Math.random() * brandColors.length)];
                        lineFlowColors.push(brandColor.r, brandColor.g, brandColor.b);
                        lineFlowColors.push(brandColor.r, brandColor.g, brandColor.b);

                        connections++;
                        if (connections >= maxConnections) break; 
                    }
                }
            }

            return {
                positions,
                colors,
                linePositions: new Float32Array(linePoints),
                lineAttributes: {
                    progress: new Float32Array(lineProgress),
                    offset: new Float32Array(lineOffsets),
                    speed: new Float32Array(lineSpeeds),
                    flowColor: new Float32Array(lineFlowColors)
                }
            };
        });

    // Also handle useFrame unconditionally so we obey hook rules
    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.x -= delta / 35;
            group.current.rotation.y += delta / 35;
        }

        if (lineMaterial.current) {
            lineMaterial.current.uTime = state.clock.elapsedTime;
        }
    });

    if (!particlesData) return null;

    const { positions, colors, linePositions, lineAttributes } = particlesData;

    return (
        <group ref={group} rotation={[0, 0, Math.PI / 4]}>
            {/* Particles */}
            <Points positions={positions} colors={colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.05} // Increased from 0.035
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Data Flow Lines */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-aProgress"
                        args={[lineAttributes.progress, 1]}
                    />
                    <bufferAttribute
                        attach="attributes-aOffset"
                        args={[lineAttributes.offset, 1]}
                    />
                    <bufferAttribute
                        attach="attributes-aSpeed"
                        args={[lineAttributes.speed, 1]}
                    />
                     <bufferAttribute
                        attach="attributes-aFlowColor"
                        args={[lineAttributes.flowColor, 3]}
                    />
                </bufferGeometry>
                {/* @ts-expect-error DataFlowMaterial custom element */}
                <dataFlowMaterial
                    ref={lineMaterial}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    linewidth={2} // Increased line width (supported on some platforms)
                />
            </lineSegments>
        </group>
    );
};

const HeroBackground = () => {
    return (
        <div className="absolute inset-0 z-0 bg-[#080510]">
             <Canvas camera={{ position: [0, 0, 4] }} gl={{ antialias: true, alpha: true }}>
                <ParticleNetwork />
             </Canvas>
             
             {/* Gradient Overlays */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#080510] via-transparent to-[#080510] pointer-events-none"></div>
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#080510_100%)] opacity-80 pointer-events-none"></div>
        </div>
    );
};

export default HeroBackground;
