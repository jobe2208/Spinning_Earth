import { createSphere } from './earth_geometry.js';
import { loadGeoJSON } from './earth_json.js';

export function createEarth(scene) {
    const sphere = createSphere();
    scene.add(sphere);
    loadGeoJSON(sphere);
    return sphere;
}

/* No longer used; rotation handled in scene.js but keep for if future changes needed
export function rotateEarth
(sphere, speed = 0.005) {
    sphere.rotation.y += speed;
}
*/