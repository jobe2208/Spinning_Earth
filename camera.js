import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";

export function createCamera() {
    const camera = new THREE.PerspectiveCamera(
        25,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    //camera.position.z = 5;
    camera.position.set(5, 0, 0);

    // Make camera look at the center of the Earth
    camera.lookAt(0, 0, 0);
    return camera;
}

export function handleResize(camera, renderer) {
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
