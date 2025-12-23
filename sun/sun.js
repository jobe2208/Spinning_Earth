import { createSphere } from './sun_geometry.js';


export function createSun(scene) {
    const sphere = createSphere();
    sphere.position.set(2, 5, -10);
    scene.add(sphere);
   // loadGeoJSON(sphere);
    return sphere;
}