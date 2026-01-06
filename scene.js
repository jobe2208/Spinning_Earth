import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";
import { animateUFO } from './ufo/ufo.js';

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

export function animate(scene, camera, renderer, sphere, ufo = null) {
    sphere.rotation.z = THREE.MathUtils.degToRad(23.5);
    let startTime = Date.now();

export function animate(scene, camera, renderer, earth, sunMesh, sunLight, cameraController) {
    function render() {
        requestAnimationFrame(render);
        const elapsedTime = Date.now() - startTime;

        sphere.rotation.y += 0.005;

        if (ufo) {
            animateUFO(ufo, elapsedTime);
        }
        earth.rotation.x += 0.00;
        // earth.rotation.y += 0.005;
        //sunMesh.rotation.x += 0.00;
        //sunMesh.rotation.y += 0.01;
        sunLight.position.copy(sunMesh.position);
        sunLight.target.position.copy(earth.position);
        sunLight.target.updateMatrixWorld();
        cameraController.update(earth);

        //


        renderer.render(scene, camera);
    }
    render();
}
