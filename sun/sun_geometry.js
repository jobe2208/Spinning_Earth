import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";

export function createSphere() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        //Yellowish color for the sun
        color: 0xFFFF00,
        roughness: 0.5,
        metalness: 0.5,

    });
    return new THREE.Mesh(geometry, material);
}
export function sunPosition(sphere){
    sphere.position.x = 5;
    sphere.position.y = 5;
    sphere.position.z = -10;
}