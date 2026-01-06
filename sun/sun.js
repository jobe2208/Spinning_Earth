import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";
import { createSphere } from './sun_geometry.js';


export function createSun(scene, earthMesh) {
    const sunMesh = createSphere();
    sunMesh.position.set(5, 2, 0);

    scene.add(sunMesh);
    const sunLight = new THREE.DirectionalLight(0xffffff, 3.0);
    scene.add(sunLight);
    scene.add(sunLight.target);


    return { sunMesh, sunLight };
}