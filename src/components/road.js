import { THREE } from "../libs/three.js";
import { createImagePlane, createImageBox } from "../helpers.js";

const IMAGES = {
  BLACK: "./images/square-black.png",
  WHITE: "./images/square-white.png",
  BUTTON: "./images/square-button.png",
  BRICK: "./images/brick.png",
  TREE: "./images/tree-evergreen.png",
  MOSQUE: "./images/mosque.png"
};

export class Road {
  constructor({ length }) {
    this.group = new THREE.Group();

    this.roadStartCollider = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
    this.roadStartCollider.position.set(-1, 1, 0);
    this.roadStartCollider.visible = false;

    this.group.add(
      this.roadStartCollider,
      createImageBox({
        href: IMAGES.BRICK,
        position: [-1, 0, 0]
      }),
      createImageBox({
        href: IMAGES.BRICK,
        position: [-1, 1, 0]
      }),
      createImagePlane({
        href: IMAGES.MOSQUE,
        position: [length / 2 + 1, 2.5, -0.5],
        scale: 4
      })
    );

    for (let i = 0; i < length; i++) {
      let roadPart = createImageBox({
        href: i % 2 ? IMAGES.WHITE : IMAGES.BLACK,
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
