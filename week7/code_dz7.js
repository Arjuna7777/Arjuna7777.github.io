import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cylgeometry = new THREE.CylinderGeometry(5, 5, 20, 32);
const cylmaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
const cylinder = new THREE.Mesh(cylgeometry, cylmaterial);
scene.add(cylinder);
cylinder.position.z = -25;
cylinder.position.x = 5;

const boxgeometry = new THREE.BoxGeometry(2, 2, 2);
const boxmaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const cube = new THREE.Mesh(boxgeometry, boxmaterial);
scene.add(cube);

var lightOne=new THREE.AmbientLight(0x0000FF, 0.5);
scene.add(lightOne);

var lightTwo=new THREE.PointLight(0x0000FF, 0.5);
scene.add(lightTwo);

lightTwo.position.set(25, 0, -25)

camera.position.z = 7;
camera.position.x = 2;

renderer.setClearColor(0x0000FF);
renderer.clear();

let angle = 0, radius = 47;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  cylinder.rotation.x += 0.02;
  cylinder.rotation.y += 0.02;

  lightTwo.position.x = radius * Math.cos(angle) + 5;
  lightTwo.position.y = radius * Math.sin(angle);

  angle += Math.PI / 180;

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

animate();
