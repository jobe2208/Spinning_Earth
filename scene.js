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

let angle = 0; // just for camera orbit debug
export function animate(scene, camera, renderer, earth, sunMesh, sunLight) {
    function render() {
        requestAnimationFrame(render);
        earth.rotation.x += 0.00;
        // earth.rotation.y += 0.005;
        //sunMesh.rotation.x += 0.00;
        //sunMesh.rotation.y += 0.01;
        sunLight.position.copy(sunMesh.position);
        sunLight.target.position.copy(earth.position);
        sunLight.target.updateMatrixWorld();

        // CAMERA ORBIT (DEBUG) - remove when we add camera controls later
        angle += 0.002;          // speed
        const radius = 20;

        camera.position.x = Math.cos(angle) * radius;
        camera.position.z = Math.sin(angle) * radius;
        camera.lookAt(0, 0, 0);
        //


        renderer.render(scene, camera);
    }
    render();
}