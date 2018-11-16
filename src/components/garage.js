import { THREE } from "/three.js";
import { createImagePlane, createImageBox } from "/helpers.js";

const IMAGES = {
  BRICK: "./images/brick.png",
  SIGN: "./images/sign.png"
  //   BUTTON: "./images/square-button.png"
};

export class Garage {
  constructor() {
    this.group = new THREE.Group();
    this.group.castShadow = true;
    this.group.receiveShadow = true;

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

    this.parkWall = new THREE.Group();
    this.parkWall.castShadow = true;
    this.parkWall.receiveShadow = true;
    // this.parkWall.visible = false;

    this.parkWall.add(
      createImagePlane({
        href: IMAGES.SIGN,
        position: [0, 1, 0.5]
      }),
      createImagePlane({
        href: IMAGES.SIGN,
        position: [1, 1, 0.5]
      })
    );
    this.group.add(this.parkWall);

    this.parkingSlot = new THREE.Mesh(new THREE.BoxGeometry(2, 1.2, 1));
    this.parkingSlot.position.set(0.5, 1, 0);
    this.parkingSlot.visible = false;

    this.group.add(this.parkingSlot);

    //light

    let garageLight = new THREE.PointLight(0xffffff, 1, 10);
    garageLight.castShadow = true;
    garageLight.position.set(0, 1, 0.9);
    garageLight.decay = 0;

    this.group.add(garageLight);

    window.garageLight = garageLight;
    // garageLight.visible = false;
  }

  carInside() {
    this.parkWall.children.forEach(slot => {
      slot.material.opacity = 0.6;
    });
  }

  carOutside() {
    this.parkWall.children.forEach(slot => {
      slot.material.opacity = 1;
    });
  }

  carParked() {}
}
