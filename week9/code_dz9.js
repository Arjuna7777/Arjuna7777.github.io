import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

window.addEventListener("DOMContentLoaded", () => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 3000 );
    const renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0xecd1ff);
    document.body.appendChild( renderer.domElement );

    var lightOne=new THREE.AmbientLight(0xffffff, 1);
    scene.add(lightOne);

    const light = new THREE.HemisphereLight( 0xffffbb, 0xcccccc, 1 );
    scene.add( light );

      // Instantiate a loader
    const loader = new GLTFLoader();

    // Load a glTF resource
    loader.load(
      // resource URL
      'IronMan.obj',
      // called when the resource is loaded
      function ( gltf ) {
         //gltf.scene.scale.set(0.1, 0.1, 0.1);
         gltf.scene.position.z=-10; 
         gltf.scene.rotation.y=+Math.PI/4; 
         scene.add( gltf.scene );
          //console.log(gtfl);
      },
      // called while loading is progressing
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {
        console.log( 'An error happened' );
      }
    );    

    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }
    animate();

});
