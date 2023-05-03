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

const spheregeometry = new THREE.SphereGeometry(1, 16, 16);
const spherematerial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const sphere = new THREE.Mesh(spheregeometry, spherematerial);
scene.add(sphere);
sphere.position.x = -3;

const boxgeometry = new THREE.BoxGeometry(2, 2, 2);
const boxmaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
const cube = new THREE.Mesh(boxgeometry, boxmaterial);
scene
