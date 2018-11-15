import { THREE } from "/three.js";
import { createImagePlane, createImageBox } from "/helpers.js";

const IMAGES = {
  BRICK: "./images/brick.png"
  //   WHITE: "./images/square-white.png",
  //   BUTTON: "./images/square-button.png"
};

export class Garage {
  constructor() {
    this.group = new THREE.Group();

    //floor
    this.group.add(createImageBox({ href: IMAGES.BRICK, position: [0, 0, 0] }));
    this.group.add(createImageBox({ href: IMAGES.BRICK, position: [1, 0, 0] }));
    this.group.add(createImageBox({ href: IMAGES.BRICK, position: [2, 0, 0] }));

    //roof
    this.group.add(createImageBox({ href: IMAGES.BRICK, position: [0, 2, 0] }));
    this.group.add(createImageBox({ href: IMAGES.BRICK, position: [1, 2, 0] }));
    this.group.add(createImageBox({ href: IMAGES.BRICK, position: [2, 2, 0] }));

    //end-wall - wall to collide with
    this.garageWall = createImageBox({
      href: IMAGES.BRICK,
      position: [2, 1, 0]
    });
    this.group.add(this.garageWall);

    //back-wall
    this.group.add(
      createImagePlane({ href: IMAGES.BRICK, position: [0, 1, -0.5] })
    );
    this.group.add(
      createImagePlane({ href: IMAGES.BRICK, position: [1, 1, -0.5] })
    );
    this.group.add(
      createImagePlane({ href: IMAGES.BRICK, position: [2, 1, -0.5] })
    );

    //front-wall
    this.group.add(
      createImagePlane({
        href: IMAGES.BRICK,
        position: [0, 1, 0.5],
        opacity: 0.5
      })
    );
    this.group.add(
      createImagePlane({
        href: IMAGES.BRICK,
        position: [1, 1, 0.5],
        opacity: 0.5
      })
    );

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
