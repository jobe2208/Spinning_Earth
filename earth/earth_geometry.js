import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";

export function createSphere() {
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
        color: 0x0077ff,
        roughness: 0.5,
        metalness: 0.5,
    });
    return new THREE.Mesh(geometry, material);
}

export function lonLatToVector3(lon, lat, radius = 1) {
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(-lon);

    return new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}
