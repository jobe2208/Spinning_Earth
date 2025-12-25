/*
import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";

function createScene() {
    return new THREE.Scene();
}

function createCamera() {
    const camera = new THREE.PerspectiveCamera(
        25,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    return camera;
}

function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    return renderer;
}

function createSphere() {
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
        color: 0x0077ff,
        roughness: 0.5,
        metalness: 0.5,
        //wireframe: true
    });
    return new THREE.Mesh(geometry, material);
}

function createLighting(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 10);
    pointLight.position.set(2, 5, 4);
    scene.add(pointLight);
}


function handleResize(camera, renderer) {
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animate(scene, camera, renderer, sphere) {
    function render() {
        requestAnimationFrame(render);
        sphere.rotation.x += 0.00;
        sphere.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    render();
}


function lonLatToVector3(lon, lat, radius = 1) {
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(-lon);

    return new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}


function addMergedDotsFromGeoJSON(sphere, geoJSON) {
    const positions = [];

    geoJSON.features.forEach(feature => {
        const geom = feature.geometry;

        if (geom.type === "MultiPolygon") {
            geom.coordinates.forEach(polygon =>
                polygon.forEach(ring =>
                    ring.forEach(([lon, lat]) => {
                        const v = lonLatToVector3(lon, lat);
                        positions.push(v.x, v.y, v.z);
                    })
                )
            );
        }

        if (geom.type === "Polygon") {
            geom.coordinates.forEach(ring =>
                ring.forEach(([lon, lat]) => {
                    const v = lonLatToVector3(lon, lat);
                    positions.push(v.x, v.y, v.z);
                })
            );
        }
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.003, // adjust visible dot size
    });

    const points = new THREE.Points(geometry, material);
    sphere.add(points);
}



// Main execution
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
const sphere = createSphere();

scene.add(sphere);
createLighting(scene);
// Load GeoJSON dynamically
fetch('map.json')
    .then(response => response.json())
    .then(data => {
        addMergedDotsFromGeoJSON(sphere, data);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));

//createDot(sphere);
handleResize(camera, renderer);
animate(scene, camera, renderer, sphere);
 */

import { createCamera, handleResize } from './camera.js';
import { createScene, createRenderer, createLighting, animate } from './scene.js';
import { createEarth } from './earth/earth.js';
import {createSun} from "./sun/sun.js";

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
const earth = createEarth(scene);
const { sunMesh, sunLight } = createSun(scene, earth);

createLighting(scene);
handleResize(camera, renderer);
animate(scene, camera, renderer, earth, sunMesh, sunLight);
