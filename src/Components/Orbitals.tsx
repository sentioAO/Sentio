import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';
import React, { useRef } from 'react';
import '../App.css';
interface OrbitalDotProps {
    color: string;
    radius: number;
    speed: number;
    orbitIndex: number;
}

const OrbitalDot: React.FC<OrbitalDotProps> = ({ color, radius, speed, orbitIndex }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const lineRef = useRef<THREE.Line>(null);
    console.log('orbitIndex', orbitIndex);

    // Use a full circle instead of an elliptical arc
    const totalAngle = Math.PI * 2; // Full circle
    const curve = new THREE.EllipseCurve(
        0, 0,
        radius, radius,
        -Math.PI / 2,
        -Math.PI / 2 + totalAngle,
        true,
        0
    );

    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
        const point = curve.getPointAt(i / 100);
        points.push(new THREE.Vector3(point.x, 0, point.y));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 'white' });

    useFrame(({ clock }) => {
        if (meshRef.current && lineRef.current) {
            const elapsedTime = clock.getElapsedTime();
            const angle = elapsedTime * speed;
            const normalizedAngle = (angle % 1 + 1) % 1;
            const point = curve.getPointAt(normalizedAngle);
            meshRef.current.position.set(point.x - radius, 0, point.y);

            lineRef.current.geometry.setFromPoints(
                points.map(p => p.clone().add(new THREE.Vector3(-radius, 0, 0)))
            );
        }
    });

    return (
        <>
            {/* @ts-expect-error 3js-error */}
            <motion.mesh ref={meshRef}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
            </motion.mesh>
            {/* @ts-expect-error 3js-error */}
            <line ref={lineRef} geometry={geometry} material={material} />
        </>
    );
};

const OrbitalAnimation: React.FC = () => {
    return (
        <Canvas
            camera={{ position: [10, 10, 20], fov: 60, up: [0, 1, 0] }}
            className="w-full h-full app-background"
            
        >
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} />

            <group position={[15, 0, 0]}>
                <OrbitalDot color="white" radius={11} speed={0.16} orbitIndex={0} />
                <OrbitalDot color="white" radius={10} speed={0.15} orbitIndex={0} />
                <OrbitalDot color="white" radius={9} speed={0.14} orbitIndex={0} />
                <OrbitalDot color="white" radius={8} speed={0.23} orbitIndex={0} />
                <OrbitalDot color="white" radius={7} speed={0.12} orbitIndex={1} />
            </group>

            <OrbitControls
                enableZoom={false}   // Enable zoom
                enableRotate={true} // Enable rotation
                enablePan={false}    // Enable panning

                maxPolarAngle={Math.PI / 2} // Limit vertical rotation
                minDistance={5}    // Minimum zoom distance
                maxDistance={100}  // Maximum zoom distance
            />

        </Canvas>
    );
};

export default OrbitalAnimation;
