import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";

export function createSphere() {
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
        'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg',
        () => console.log('Texture loaded'),
        undefined,
        (err) => console.error('Texture loading error:', err)
    );

    const material = new THREE.MeshStandardMaterial({
        map: earthTexture,
        roughness: 0.7,
        metalness: 0.2,
    });

    return new THREE.Mesh(geometry, material);
}

export function lonLatToVector3(lon, lat, radius = 1) {
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(-lon);

    return new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}
