//Johannes was here

import { createCamera, handleResize } from './camera.js';
import { createScene, createRenderer, createLighting, animate } from './scene.js';
import { createEarth } from './earth/earth.js';
import { createUFO } from './ufo/ufo.js';

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
const sphere = createEarth(scene);
const ufo = createUFO();

let ufoVisible = true;
scene.add(ufo);
createLighting(scene);
handleResize(camera, renderer);
animate(scene, camera, renderer, sphere, ufo);

const toggleButton = document.getElementById('toggleUFO');
toggleButton.addEventListener('click', () => {
    ufoVisible ? scene.remove(ufo) : scene.add(ufo);
    toggleButton.textContent = ufoVisible ? 'Add UFO' : 'Remove UFO';
    ufoVisible = !ufoVisible;
});
