import { THREE } from "/three.js";
import { createImagePlane } from "/helpers.js";

const IMAGES = {
  POLICE: "./images/car-body-police.png",
  TAXI: "./images/car-body-taxi.png",
  WHEEL: "./images/car-wheel.png",
  FIRE: "./images/fire.png"
};

export class Car {
  constructor(props) {
    this.isCrashed = false;
    this.speed = 0;

    Object.assign(this, props);

    this.group = new THREE.Group();

    const body = createImagePlane({ href: IMAGES.POLICE });
    const wheelScale = 0.26;

    this.collider = body.geometry;

    const wheelXDiff = 0.263;
    const wheelY = -0.35;

    const wheel1 = createImagePlane({
      href: IMAGES.WHEEL,
      scale: wheelScale,
      position: [-wheelXDiff, wheelY, 0]
    });
    const wheel2 = createImagePlane({
      href: IMAGES.WHEEL,
      scale: wheelScale,
      position: [wheelXDiff, wheelY, 0]
    });

    this.wheels = [wheel1, wheel2];

    this.group.add(body);
    this.group.add(wheel1);
    this.group.add(wheel2);
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
