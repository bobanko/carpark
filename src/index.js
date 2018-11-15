//import * as THREE from "./three";
import { THREE } from "/three.js";

import { Car } from "./components/car.js";
import { Road } from "./components/road.js";
import { Garage } from "./components/garage.js";

var scene = new THREE.Scene();
scene.background = new THREE.Color("#c2d4d1");

var camera = new THREE.PerspectiveCamera(
  45, // 75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 7;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

document.body.appendChild(renderer.domElement);

const messageFail = document.querySelector(".message-fail");
const messageWin = document.querySelector(".message-win");

messageFail.hidden = true;
messageWin.hidden = true;

let car = new Car();
scene.add(car.group);
//todo: get rid of groups?
let road = new Road({ length: 10 });
scene.add(road.group);

let garage = new Garage();
scene.add(garage.group);

scene.add(new THREE.AmbientLight(0xff0000, 1.2));

scene.fog = new THREE.Fog(new THREE.Color(0x000000), 0.0025, 100);

const updatableComponents = [car];
const props = {
  acceleration: 0
};

function update() {
  updatableComponents.forEach(component => {
    component.update(props);
  });

  let { x, y } = car.group.position;

  camera.position.x = x;
  camera.position.y = y;

  //todo: check garage vs car collision

  let wallCollider = new THREE.Box3().setFromObject(garage.garageWall);

  let carCollider = new THREE.Box3().setFromObject(car.group);

  let isCarCollided = wallCollider.intersectsBox(carCollider);
  //test
  if (isCarCollided) carCrash();
  //console.log(isCarCrash);
}

let carCrashed = false;
function carCrash() {
  carCrash = () => 0;
  carCrashed = true;
  messageFail.hidden = false;

  car.acceleration *= -1;
  //car.acceleration = 0;
  props.acceleration = 0;
}

function animate() {
  requestAnimationFrame(animate);

  update();

  renderer.render(scene, camera);
}
animate();

//todo: somehow wrap eventlisteners?
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown({ code }) {
  //disable controls after crash
  if (carCrashed) return;

  switch (code) {
    case "ArrowLeft":
      props.acceleration = -1;
      break;
    case "ArrowRight":
      props.acceleration = 1;
      break;
    case "Space":
      car.speed = 0;
      car.group.position.x = 0;
      break;
  }
}

document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyUp({ code }) {
  //console.log(code);

  switch (code) {
    case "ArrowLeft":
    case "ArrowRight":
    case "Space":
      props.acceleration = 0;
      break;
  }
}
//debug tools

window.scene = scene; //debug
document.addEventListener("wheel", ({ wheelDeltaY }) => {
  camera.translateZ(Math.sign(wheelDeltaY));
  console.log(camera.position.z);
});

//todo: make camera follow lerp

function initCamera() {
  let controls = new THREE.TrackballControls(camera);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [65, 83, 68];

  updatableComponents.push(controls);
}

//initCamera();
