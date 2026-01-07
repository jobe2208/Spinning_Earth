import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";

export function makeCameraController(camera) {
    const radius = 20;
    const spinSpeed =  0.002;     // auto orbit
    const sensitivity =  0.002; // mouse
    const maxPitch = Math.PI / 2 - 0.1; // prevent flipping

    // FOV zoom settings
    const minFOV = 5;
    const maxFOV = 25;
    const zoomSpeed = 2;

    let yaw = 0;
    let userPitch = 0;

    let dragging = false;
    let prevX = 0;
    let prevY = 0;

    window.addEventListener("mousedown", (e) => {
        dragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
        dragging = false;
    });

    window.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;

        // Pitch: up/down
        userPitch -= dy * sensitivity;
        userPitch = THREE.MathUtils.clamp(userPitch, -maxPitch, maxPitch);
    });

    window.addEventListener("wheel", (e) => {
        e.preventDefault();

        camera.fov += e.deltaY * zoomSpeed * 0.01;
        camera.fov = THREE.MathUtils.clamp(camera.fov, minFOV, maxFOV);
        camera.updateProjectionMatrix();
    }, { passive: false });

    function update(target = new THREE.Vector3(0, 0, 0)) {

        // Accept Mesh/Object3D OR Vector3
        const t = (target && target.position) ? target.position : target;

        yaw += spinSpeed;
        const pitch = userPitch;

        camera.position.x = t.x + radius * Math.sin(yaw) * Math.cos(pitch);
        camera.position.y = t.y + radius * Math.sin(pitch);
        camera.position.z = t.z + radius * Math.cos(yaw) * Math.cos(pitch);

        camera.lookAt(t);
    }


    return { update };
}
