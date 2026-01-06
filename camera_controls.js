import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";

export function makeCameraController(camera) {
    const radius = 20;
    const spinSpeed =  0.002;     // auto orbit
    const sensitivity =  0.002; // mouse
    const maxPitch = Math.PI / 2 - 0.1; // prevent flipping

    let autoYaw = 0;
    let userYawOffset = 0;
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

        // Optional: allow user to adjust yaw too (feels nice)
       // userYawOffset -= dx * sensitivity;

        // Pitch: up/down
        userPitch -= dy * sensitivity;
        userPitch = THREE.MathUtils.clamp(userPitch, -maxPitch, maxPitch);
    });

    function update(target = new THREE.Vector3(0, 0, 0)) {
        autoYaw += spinSpeed;

        // Accept Mesh/Object3D OR Vector3
        const t = (target && target.position) ? target.position : target;

        const yaw = autoYaw + userYawOffset;
        const pitch = userPitch;

        camera.position.x = t.x + radius * Math.sin(yaw) * Math.cos(pitch);
        camera.position.y = t.y + radius * Math.sin(pitch);
        camera.position.z = t.z + radius * Math.cos(yaw) * Math.cos(pitch);

        camera.lookAt(t);
    }


    return { update };
}
