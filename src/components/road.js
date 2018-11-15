import { THREE } from "/three.js";
import { createImagePlane, createImageBox } from "/helpers.js";

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
      let roadPart = createImageBox({
        href: IMAGES.WHITE,
        position: [i, 0, 0]
      });

      this.group.add(roadPart);

      let treeZ = i % 2 ? 1 : -1;
      let tree = createImagePlane({
        href: IMAGES.TREE,
        position: [i, 1, treeZ / 2]
      });

      this.group.add(tree);
    } ///for

    this.group.position.set(0, -1, 0);
  }
}
