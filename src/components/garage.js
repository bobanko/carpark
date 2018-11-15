import { THREE } from "/three.js";
import { loadSprite } from "/helpers.js";

const IMAGES = {
  BRICK: "./images/brick.png"
  //   WHITE: "./images/square-white.png",
  //   BUTTON: "./images/square-button.png"
};

function createWall(...position) {
  const spriteMap = new THREE.TextureLoader().load(IMAGES.BRICK);
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({
    map: spriteMap,
    color: 0xffffff
  });
  let cube = new THREE.Mesh(geometry, material);
  cube.position.set(...position);
  cube.receiveShadow = true;
  return cube;
}

export class Garage {
  constructor() {
    this.group = new THREE.Group();

    //floor
    this.group.add(createWall(0, 0, 0));
    this.group.add(createWall(1, 0, 0));
    this.group.add(createWall(2, 0, 0));

    //roof
    this.group.add(createWall(0, 2, 0));
    this.group.add(createWall(1, 2, 0));
    this.group.add(createWall(2, 2, 0));

    //end-wall
    this.group.add(createWall(2, 1, 0));

    //side-wall
    this.group.add(createWall(0, 1, -1));
    this.group.add(createWall(1, 1, -1));
    this.group.add(createWall(2, 1, -1));

    //light
    let light = new THREE.PointLight(0xffffff, 10.8, 18);
    light.castShadow = true;
    light.position.set(-10, 0, 0);
    this.group.add(light);
    let helper = new THREE.PointLightHelper(light, 0.1);
    this.group.add(helper);
    //placement
    this.group.position.set(10, -1, 0);
  }
}
