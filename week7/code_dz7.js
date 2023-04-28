import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 3000 );

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xCBEFFF); 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const pyramidgeometry = new THREE.CylinderGeometry(0, 0.8, 2, 4); 
const pyramidmaterial = new THREE.MeshLambertMaterial( {color: 0x00FF00});
const pyramidmesh = new THREE.Mesh(pyramidgeometry, pyramidmaterial);
pyramidmesh.position.set(0, 2, -10); 
scene.add(pyramidmesh); 

const boxgeometry = new THREE.BoxGeometry(1, 1, 1);
const boxmaterial = new THREE.MeshNormalMaterial({ 
  color: 0x0000FF, 
  transparent: true, 
  opacity: 1 
}); 
const boxmesh = new THREE.Mesh(boxgeometry, boxmaterial); 
boxmesh.position.set(-0.9, 0, -6); 
scene.add(boxmesh);

const spheregeometry = new THREE.SphereGeometry(0.5); 
const spherematerial = new THREE.LineBasicMaterial({ color: 0x888888 });
const spheremesh = new THREE.Line(spheregeometry, spherematerial); 
spheremesh.position.set(0.9, 0, -6); 
scene.add(spheremesh); 

const circlegeometry = new THREE.CircleBufferGeometry(0.5); 
const circlematerial = new THREE.MeshStandardMaterial({ 
	color: 0x098877,  
	roughness: 90.0,  
	metalness: 0.2 
});
const circlemesh = new THREE.Mesh(circlegeometry, circlematerial); 
circlemesh.position.set(2, 0, -6); 
circlemesh.rotation.set(0, 0.5, 0); 
scene.add(circlemesh); 

const paraFunction = function(a, b) 
{ 
	var x=-5+5*a; 
	var y=-5+5*b; 
	var z = (Math.sin(a*Math.PI)+Math.sin(b*Math.PI))*(-7); 
	return new THREE.Vector3(x, y, z); 
} 

const parageometry = new ParametricGeometry(paraFunction, 8, 8);
const paramaterial = new THREE.MeshBasicMaterial( {color: 0xF3FFE2});
const paramesh = new THREE.Mesh(parageometry, paramaterial);
paramesh.position.set(0, -2, -100);
scene.add(paramesh);

const planegeometry = new THREE.PlaneGeometry(10, 10); 
const planematerial = new THREE.MeshPhongMaterial({ 
	color: 0xF3FFE2, 
	specular: 0xFF0000, 
	shininess:
  }); 
const planemesh=new THREE.Mesh(planegeometry, planematerial); 
planemesh.position.set(0, -20, -100); 
scene.add(planemesh);

var delta = 0;

var lightOne=new THREE.AmbientLight(0xffffff, 0.5);
scene.add(lightOne);

var lightTwo=new THREE.PointLight(0xffffff, 0.5);
scene.add(lightTwo);


function animate() {
	delta += 0.1; 
	//planegeometry.vertices[0].z = -25 + Math.sin(delta)*50; 
	//planegeometry.verticesNeedUpdate = true;
	
        pyramidmesh.rotation.y+=0.1; 
	
	paramesh.rotation.x+=0.1; 
	paramesh.rotation.y+=0.1;

	renderer.render( scene, camera );
	requestAnimationFrame( animate );	
}

animate();
