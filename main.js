//Johannes was here

import { createCamera, handleResize } from './camera.js';
import { createScene, createRenderer, createLighting, animate } from './scene.js';
import { createEarth } from './earth/earth.js';
import { createUFO } from './ufo/ufo.js';
import {createSun} from './sun/sun.js';
import {makeCameraController} from "./camera_controls.js";

const scene = createScene();
const camera = createCamera();
const cameraController = makeCameraController(camera);
const renderer = createRenderer();
const sphere = createEarth(scene);
const ufo = createUFO();
const { sunMesh, sunLight } = createSun(scene, sphere);

let ufoVisible = true;
scene.add(ufo);
createLighting(scene);
handleResize(camera, renderer);
//animate(scene, camera, renderer, sphere, ufo);

const toggleButton = document.getElementById('toggleUFO');
toggleButton.addEventListener('click', () => {
    ufoVisible ? scene.remove(ufo) : scene.add(ufo);
    toggleButton.textContent = ufoVisible ? 'Add UFO' : 'Remove UFO';
    ufoVisible = !ufoVisible;
});
animate(scene, camera, renderer, sphere, sunMesh, sunLight, cameraController, ufo);
