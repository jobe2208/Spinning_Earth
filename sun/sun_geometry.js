import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";

export function createSphere() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 2.0,
        roughness: 1.0,
        metalness: 0.0,
    });
    return new THREE.Mesh(geometry, material);
}
