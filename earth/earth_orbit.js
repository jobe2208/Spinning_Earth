// earth_orbit.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createOrbitControls(camera, renderer, domElement, target = null, options = {}) {
    const el = domElement || (renderer && renderer.domElement);
    if (!el) throw new Error('No DOM element or renderer.domElement provided for OrbitControls.');

    const controls = new OrbitControls(camera, el);

    controls.enableDamping = options.enableDamping ?? true;
    controls.dampingFactor = options.dampingFactor ?? 0.05;
    controls.enablePan = options.enablePan ?? false;
    controls.enableZoom = options.enableZoom ?? true;

    controls.autoRotate = options.autoRotate ?? false;
    controls.autoRotateSpeed = options.autoRotateSpeed ?? 2.0;

    // If target is an Object3D, use its position; if it's a Vector3-like, copy it.
    if (target) {
        if (target.position) controls.target.copy(target.position);
        else if (typeof target.x === 'number' && typeof target.y === 'number' && typeof target.z === 'number') {
            controls.target.set(target.x, target.y, target.z);
        }
        controls.update();
    }

    return controls;
}

export function updateOrbitControls(controls) {
    if (!controls) return;
    controls.update(); // call each frame (for damping / autoRotate)
}
