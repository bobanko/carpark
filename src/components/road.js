import { THREE } from "/three.js";
import { loadSprite } from "/helpers.js";

const IMAGES = {
  BLACK: "./images/square-black.png",
  WHITE: "./images/square-white.png",
  BUTTON: "./images/square-button.png",
  BRICK: "./images/brick.png",
  TREE: "./images/tree-evergreen.png"
};

export class Road {
  constructor({ length }) {
    this.group = new THREE.Group();

    for (let i = 0; i < length; i++) {
      const spriteMap = new THREE.TextureLoader().load(IMAGES.WHITE);

      let geometry = new THREE.BoxGeometry(1, 1, 1);
      let material = new THREE.MeshBasicMaterial({
        map: spriteMap,
        color: 0xffffff
      });
      let roadPart = new THREE.Mesh(geometry, material);
      roadPart.position.set(i, 0, 0);
      //cube.rotation.x = Math.PI / 4;
      this.group.add(roadPart);

      let tree = loadSprite(IMAGES.TREE);

      let treeZ = i % 2 ? 1 : -1;
      tree.position.set(i, 1, treeZ / 2);

      this.group.add(tree);
    } ///for

    this.group.position.set(0, -1, 0);
  }
}
