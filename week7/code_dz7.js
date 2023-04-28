//import * as THREE from '../three/three.module.js';
import * as THREE from 'three';

import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';

// Our Javascript will go here.

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 3000 );

function animatePyramid() {
  pyramidmesh.rotation.y += 0.05;
  pyramidmaterial.color.setHex(Math.random() * 0xffffff);
  requestAnimationFrame(animatePyramid);
}

animatePyramid();

// Анимация куба и изменение цвета
function animateBox() {
  boxmesh.rotation.x += 0.05;
  boxmesh.rotation.y += 0.05;
  boxmaterial.color.setHex(Math.random() * 0xffffff);
  requestAnimationFrame(animateBox);
}

animateBox();

// Анимация сферы и изменение цвета
function animateSphere() {
  spheremesh.rotation.x += 0.05;
  spheremesh.rotation.y += 0.05;
  spherematerial.color.setHex(Math.random() * 0xffffff);
  requestAnimationFrame(animateSphere);
}

animateSphere();

// Анимация круга и изменение цвета
function animateCircle() {
  circlemesh.rotation.x += 0.05;
  circlemesh.rotation.y += 0.05;
  circlematerial.color.setHex(Math.random() * 0xffffff);
  requestAnimationFrame(animateCircle);
}

animateCircle();

// Анимация параметрической геометрии и изменение цвета
function animateParametric() {
  paramesh.rotation.x += 0.05;
  paramesh.rotation.y += 0.05;
  paramaterial.color.setHex(Math.random() * 0xffffff);
  requestAnimationFrame(animateParametric);
}

animateParametric();
