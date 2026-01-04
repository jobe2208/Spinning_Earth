import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";
import { createSphere } from './sun_geometry.js';


export function createSun(scene, earthMesh) {
    const sunMesh = createSphere();
    sunMesh.position.set(2, 2, 0);

    scene.add(sunMesh);
    const sunLight = new THREE.DirectionalLight(0xffffff, 3.0);
    scene.add(sunLight);
    scene.add(sunLight.target);

    // Debug: shows direction and confirms it's there
    scene.add(new THREE.DirectionalLightHelper(sunLight, 2))

    return { sunMesh, sunLight };
}