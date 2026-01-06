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

export function animate(scene, camera, renderer, sphere, sunMesh, sunLight, cameraController, ufo = null) {
    function render() {
        requestAnimationFrame(render);
        let startTime = Date.now();
        const elapsedTime = Date.now() - startTime;
        sphere.rotation.z = THREE.MathUtils.degToRad(23.5);


        sphere.rotation.y += 0.005;

        if (ufo) {
            animateUFO(ufo, elapsedTime);
        }
        sphere.rotation.x += 0.00;
        // earth.rotation.y += 0.005;
        //sunMesh.rotation.x += 0.00;
        //sunMesh.rotation.y += 0.01;
        sunLight.position.copy(sunMesh.position);
        sunLight.target.position.copy(sphere.position);
        sunLight.target.updateMatrixWorld();
        cameraController.update(sphere);

        //


        renderer.render(scene, camera);
    }
    render();
}
