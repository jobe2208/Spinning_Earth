//Johannes was here

import { createCamera, handleResize } from './camera.js';
import { createScene, createRenderer, createLighting, animate } from './scene.js';
import { createEarth } from './earth/earth.js';

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
const sphere = createEarth(scene);

createLighting(scene);
handleResize(camera, renderer);
animate(scene, camera, renderer, sphere);
