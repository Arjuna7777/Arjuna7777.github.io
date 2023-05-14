import * as THREE from 'three';
import { MindARThree } from 'mindar-face-three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

window.addEventListener("DOMContentLoaded", async () => {

      const mindarThree = new MindARThree({
	container: document.body,
      });

      const {renderer, scene, camera} = mindarThree;

      const anchor2 = mindarThree.addAnchor(10);

      var lightOne=new THREE.AmbientLight(0xffffff, 1);
	scene.add(lightOne);

      const light = new THREE.HemisphereLight( 0xffffbb, 0xcccccc, 1 );
	scene.add( light );

      const texture = new THREE.TextureLoader().load('1_kqi9JK434G5M3UYKfX_BbA-removebg-preview.png');

      const faceMesh = mindarThree.addFaceMesh();
      faceMesh.material.map = texture;
      faceMesh.material.transparent = true;
      faceMesh.material.needsUpdate = true;
      scene.add(faceMesh);

      await mindarThree.start();

      renderer.setAnimationLoop(() => {
	  renderer.render(scene, camera);
      });
});
