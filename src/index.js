//import * as THREE from "./three";
import { THREE } from "/three.js";

import { Car } from "./components/car/index.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  70, //45, // 75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let car = new Car();
let obj = scene.add(car.group);

console.log(car.group.children);
let acceleration = 0;

function animate() {
  requestAnimationFrame(animate);

  //carSprite.position.x += 0.01;
  car.update({ acceleration });

  // car.group.children.forEach(wheel => {
  //   // wheel.rotation.x += Math.PI / 20;
  //   wheel.rotation.x += Math.PI / 20;
  //   wheel.rotation.y += Math.PI / 20;
  //   wheel.rotation.z += Math.PI / 20;
  // });

  //car.group.rotation.z -= Math.PI * 0.005;

  renderer.render(scene, camera);
}
animate();

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown({ code }) {
  console.log(code);

  switch (code) {
    case "ArrowLeft":
      acceleration = -1;
      break;
    case "ArrowRight":
      acceleration = 1;
      break;
    case "Space":
      car.speed = 0;
      car.group.position.x = 0;
      break;
  }

  console.log(acceleration);
}

document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyUp({ code }) {
  console.log(code);

  switch (code) {
    case "ArrowLeft":
    case "ArrowRight":
    case "Space":
      acceleration = 0;
      break;
  }

  console.log(acceleration);
}
