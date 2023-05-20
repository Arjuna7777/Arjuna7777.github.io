//import * as THREE from '../three/three.module.js';
import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


var renderer, cube, lightTwo, scene, camera;

function init()
{
	// Our Javascript will go here.

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var loader = new THREE.TextureLoader();

	const boxgeometry = new THREE.BoxGeometry( 1, 1, 1 );
	/*
	const boxmaterials = [
		new THREE.MeshBasicMaterial( { color: Math.random()*0xffffff } ),
		new THREE.MeshBasicMaterial( { color: Math.random()*0xffffff } ),
		new THREE.MeshBasicMaterial( { color: Math.random()*0xffffff } ),
		new THREE.MeshBasicMaterial( { color: Math.random()*0xffffff } ),
		new THREE.MeshBasicMaterial( { color: Math.random()*0xffffff } ),
		new THREE.MeshBasicMaterial( { color: Math.random()*0xffffff } )
	];
	*/

	const boxmaterials = [
		new THREE.MeshBasicMaterial( { map: loader.load( '/assets/cube1.png') } ),
		new THREE.MeshBasicMaterial( { map: loader.load( '/assets/cube2.png') } ),
		new THREE.MeshBasicMaterial( { map: loader.load( '/assets/cube3.png') } ),
		new THREE.MeshBasicMaterial( { map: loader.load( '/assets/cube4.png') } ),
		new THREE.MeshBasicMaterial( { map: loader.load( '/assets/cube5.png') } ),
		new THREE.MeshBasicMaterial( { map: loader.load( '/assets/cube6.png') } ),
	];

	cube = new THREE.Mesh( boxgeometry, boxmaterials );
	scene.add( cube );

	const cylgeometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
	const cylmaterial = new THREE.MeshLambertMaterial( {color: 0xffff00} );
	const cylinder = new THREE.Mesh( cylgeometry, cylmaterial );
	scene.add( cylinder );
	cylinder.position.z=-25;
	cylinder.position.x=5;

	var lightOne=new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(lightOne);

	lightTwo=new THREE.PointLight(0xffffff, 0.5);
	scene.add(lightTwo);

	lightTwo.position.set(25, 0, -25)

	//напівсферичне освітлення
	var lightThree = new THREE.HemisphereLight(0xfffff, 0x080820, 1);
	scene.add(lightThree);

	//const texture = loader.load( '/assets/plants.jpg' );
	const video = document.getElementById( 'video' );
	video.play();
	const texture = new THREE.VideoTexture( video );


	var planegeometry=new THREE.PlaneGeometry(16, 9);
	var planematerial=new THREE.MeshBasicMaterial({color:0xffffff, map:texture});
	var planemesh=new THREE.Mesh(planegeometry, planematerial);
	planemesh.position.set(70, -20, -100);
	planemesh.scale.set(10, 10, 10);
	scene.add(planemesh);

	const video2 = document.getElementById( 'video2' );
	video2.play();
	const texture2 = new THREE.VideoTexture( video2 );
	//const beach = loader.load( '/assets/360-degree-beach-panorama-1217568.jpg' );
	//cylmaterial.map = beach;
	cylmaterial.map = texture2;

	cube.scale.set(3,3,3);
	cube.position.x = cube.position.x - 1;

	camera.position.z = 7;
	camera.position.x = 2;

	renderer.setClearColor (0x555555);
	renderer.clear();

	const modelloader = new GLTFLoader();

	modelloader.load( '/assets/pokemon_sudowoodo_-_tree.glb', function ( gltf ) {
		scene.add(gltf.scene);
		gltf.scene.position.set(-5,2,0);
		gltf.scene.scale.set(2,2,2);
	}, function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	}, function ( error ) {
		console.error( error );
	} );

	modelloader.load( '/assets/tree/scene.gltf', function ( gltf ) {
		scene.add(gltf.scene);
		gltf.scene.position.set(-5,-2,0);
		gltf.scene.scale.set(0.01,0.01,0.01);
	}, function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	}, function ( error ) {
		console.error( error );
	} );

}


let angle = 0, radius = 47;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	lightTwo.position.x = radius * Math.cos(angle) + 5;
	lightTwo.position.y = radius * Math.sin(angle);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
/*
	camera.position.x = radius * Math.cos(angle) + 2;
	camera.position.y = radius * Math.sin(angle);
*/
	angle += Math.PI/180;
}


const startButton = document.getElementById( 'press' );

startButton.addEventListener( 'click', function () {
	startButton.style.display="none";
	init();
	animate();
} );



//init();
//animate();

