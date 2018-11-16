import { THREE } from "../libs/three.js";
import { createImagePlane } from "../helpers.js";

const IMAGES = {
  CARS: [
    {
      BODY: "./images/car-body-police.png",
      DRIVER: "./images/cop.png"
    },
    {
      BODY: "./images/car-body-taxi.png",
      DRIVER: "./images/muslim.png"
    }
  ],
  WHEEL: "./images/car-wheel.png",
  FIRE: "./images/fire.png"
};

export class Car {
  constructor(props) {
    this.isCrashed = false;
    this.speed = 0;

    Object.assign(this, props);

    this.group = new THREE.Group();

    let carImg = IMAGES.CARS[Math.floor(Math.random() * IMAGES.CARS.length)];

    const body = createImagePlane({ href: carImg.BODY });

    const wheelScale = 0.26;
    this.group.add(
      createImagePlane({
        href: carImg.DRIVER,
        scale: wheelScale,
        position: [0, 0, 0]
      })
    );

    this.collider = body.geometry;

    const wheelXDiff = 0.263;
    const wheelY = -0.35;
    const wheelZ = 0;

    const wheel1 = createImagePlane({
      href: IMAGES.WHEEL,
      scale: wheelScale,
      position: [-wheelXDiff, wheelY, wheelZ]
    });
    const wheel2 = createImagePlane({
      href: IMAGES.WHEEL,
      scale: wheelScale,
      position: [wheelXDiff, wheelY, wheelZ]
    });

    this.wheels = [wheel1, wheel2];

    this.group.add(body);
    this.group.add(wheel1);
    this.group.add(wheel2);

    this.group.castShadow = true;
    this.group.receiveShadow = true;
  }

  crash() {
    console.log("crashed");
    this.speed *= -1;

    this.group.add(
      createImagePlane({
        href: IMAGES.FIRE,
        scale: 0.3,
        position: [0.3, 0, 0]
      })
    );
  }

  update({ acceleration }) {
    this.wheels.forEach(wheel => {
      wheel.rotation.z -= this.speed * 0.01 * 10;
    });

    const friction = 0.95;

    this.speed += acceleration * 0.4;
    this.speed *= friction;

    this.speed =
      (Math.sign(this.speed) * Math.floor(Math.abs(this.speed) * 100)) / 100;

    this.group.position.x += this.speed * 0.01;
  }
}
