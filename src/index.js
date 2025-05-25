//import * as THREE from "./three";
import { THREE } from "./libs/three.js";

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
//renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const messageFail = document.querySelector(".message-fail");
const messageWin = document.querySelector(".message-win");

let car = new Car();
car.group.position.x = 2; //10;
scene.add(car.group);
//todo: get rid of groups?
const roadLength = 20;
let road = new Road({ length: roadLength });
scene.add(road.group);

let garage = new Garage();
garage.group.position.set(roadLength, -1, 0);
scene.add(garage.group);
//ambient light
let ambient = new THREE.AmbientLight(0xffffff, 0.9);
window.ambient = ambient;
scene.add(ambient);

scene.fog = new THREE.Fog(new THREE.Color(0x000000), 0.0025, 100);

const updatableComponents = [car];
const props = {
  acceleration: 0,
};

function update() {
  scene.updateMatrixWorld(); //for proper collision detection
  updatableComponents.forEach((component) => {
    component.update(props);
  });

  let { x, y } = car.group.position;

  //todo: extract as part of camera component
  camera.position.x = x;
  camera.position.y = y;

  //todo: check garage vs car collision

  let wallCollider = new THREE.Box3().setFromObject(garage.garageWall);
  let startWallCollider = new THREE.Box3().setFromObject(
    road.roadStartCollider
  );
  let parkingSlot = new THREE.Box3().setFromObject(garage.parkingSlot);
  let carCollider = new THREE.Box3().setFromObject(car.group);

  let crashColliders = [wallCollider, startWallCollider];

  let isCarCollided = !crashColliders.every(
    (col) => !col.intersectsBox(carCollider)
  );

  //let isCarCollided = wallCollider.intersectsBox(carCollider);

  let isCarInside = parkingSlot.intersectsBox(carCollider);

  let isCarParked = parkingSlot.containsBox(carCollider);
  //test
  if (isCarCollided) carCrash();
  //console.log(isCarCrash);
  if (isCarInside) {
    garage.carInside();
  } else {
    garage.carOutside();
  }

  let isStopped = Math.abs(car.speed) < 0.02;

  //debug
  // console.log(
  //   "parked",
  //   isCarParked,
  //   "collided",
  //   isCarCollided,
  //   "speed",
  //   car.speed,
  //   "stopped",
  //   isStopped
  // );

  if (!carCrashed && isCarParked && isStopped) {
    carPark();
  }
}

let carParked = false;
function carPark() {
  carPark = () => 0;
  carParked = true;

  showWinMessage();
}

let carCrashed = false;
function carCrash() {
  carCrash = () => 0;
  car.crash();
  carCrashed = true;
  props.acceleration = 0;

  showFailMessage();
}

function showWinMessage() {
  $msgOverlay.hidden = false;
  $msgOverlay.animate(
    [
      // keyframes
      { opacity: 0 },
      {
        opacity: 1,
      },
    ],
    {
      // timing options
      duration: 500,
      fill: "both",
      easing: "ease-in-out",
    }
  );

  $msgWin.hidden = false;
}

function showFailMessage() {
  // camera.translateZ = camera.translateZ - 2;

  $msgOverlay.hidden = false;
  $msgOverlay.animate(
    [
      // keyframes
      { opacity: 0 },
      {
        opacity: 1,
      },
    ],
    {
      // timing options
      duration: 500,
      fill: "both",
      easing: "ease-in-out",
    }
  );

  $msgOverlay.animate(
    [
      // keyframes
      {},
      {
        backdropFilter: "blur(4px) grayscale(1)",
      },
    ],
    {
      // timing options

      duration: 3000,
      fill: "both",
      easing: "ease-in-out",
    }
  );

  $msgFail.hidden = false;
  [...$msgFail.children].forEach((cn) =>
    cn.animate(
      [
        // keyframes
        { opacity: 0 },
        {
          opacity: 1,
        },
      ],
      {
        // timing options
        duration: 1000,
        fill: "both",
        easing: "ease-in-out",
      }
    )
  );
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
  if (carCrashed || carParked) return;

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
//check if is mobile device
if (navigator.maxTouchPoints) {
  //document.querySelector(".control-box").classList.add("is-mobile");
}

document.querySelector(".button-restart").addEventListener("click", () => {
  window.location.reload();
});

//apply resize for canvas

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

//left
document.querySelector(".button-left").addEventListener("mousedown", () => {
  onDocumentKeyDown({ code: "ArrowLeft" });
});

document.querySelector(".button-left").addEventListener("touchstart", () => {
  onDocumentKeyDown({ code: "ArrowLeft" });
});

document.querySelector(".button-left").addEventListener("mouseup", () => {
  onDocumentKeyUp({ code: "ArrowLeft" });
});

document.querySelector(".button-left").addEventListener("touchend", () => {
  onDocumentKeyUp({ code: "ArrowLeft" });
});

//right;
document.querySelector(".button-right").addEventListener("mousedown", () => {
  onDocumentKeyDown({ code: "ArrowRight" });
});

document.querySelector(".button-right").addEventListener("touchstart", () => {
  onDocumentKeyDown({ code: "ArrowRight" });
});

document.querySelector(".button-right").addEventListener("mouseup", () => {
  onDocumentKeyUp({ code: "ArrowRight" });
});

document.querySelector(".button-right").addEventListener("touchend", () => {
  onDocumentKeyUp({ code: "ArrowRight" });
});

//debug tools

window.scene = scene; //debug
window.car = car; //debug
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
