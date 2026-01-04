import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";

export function createScene() {
    return new THREE.Scene();
}

export function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    return renderer;
}

export function createLighting(scene) {
    scene.add(new THREE.AmbientLight(0xffffff, 0.02)); // tiny fill
    // remove this for now:
    // const pointLight = new THREE.PointLight(0xffffff, 10);
    // pointLight.position.set(2, 5, 4);
    // scene.add(pointLight);
}

export function animate(scene, camera, renderer, sphere) {
    // Apply Earth's axial tilt (23.5 degrees)
    sphere.rotation.z = THREE.MathUtils.degToRad(23.5);

    function render() {
        requestAnimationFrame(render);
        // Rotate around Y-axis (counterclockwise when viewed from above North Pole)
        sphere.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    render();
}