//Johannes was here

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
