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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 10);
    pointLight.position.set(2, 5, 4);
    scene.add(pointLight);
}

export function animate(scene, camera, renderer, sphere) {
    function render() {
        requestAnimationFrame(render);
        sphere.rotation.x += 0.00;
        sphere.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    render();
}
