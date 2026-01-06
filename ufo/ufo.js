import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";

export function createUFO() {
    const ufo = new THREE.Group();

    // Main disc (saucer)
    const discGeometry = new THREE.CylinderGeometry(1, 1.2, 0.3, 32);
    const discMaterial = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        metalness: 100,
        shininess: 100
    });
    const disc = new THREE.Mesh(discGeometry, discMaterial);
    ufo.add(disc);

    // Dome (cockpit)
    const domeGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMaterial = new THREE.MeshPhongMaterial({
        color: 0x4444ff,
        transparent: true,
        opacity: 0.5
    });
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.position.y = 0.15;
    ufo.add(dome);

    // Lights around the edge
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const lightGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00});
        const light = new THREE.Mesh(lightGeometry, lightMaterial);
        light.position.set(Math.cos(angle) * 1.1, -0.1, Math.sin(angle) * 1.1);
        ufo.add(light);
    }

    ufo.scale.set(0.05, 0.05, 0.05);
    return ufo;
}

export function animateUFO(ufo, time) {
    const orbitRadius = 1.2;
    const orbitSpeed = 0.0005;
    const angle = time * orbitSpeed;

    ufo.position.x = Math.cos(angle) * orbitRadius;
    ufo.position.z = Math.sin(angle) * orbitRadius;
    ufo.position.y = Math.sin(angle * 2) * 0.3;
    ufo.rotation.y += 0.02;
}
