import { THREE } from "/three.js";
import { loadSprite } from "../helpers.js";

export const IMAGES = {
  POLICE: "./images/car-body-police.png",
  TAXI: "./images/car-body-taxi.png",
  WHEEL: "./images/car-wheel.png"
};

export class Car {
  constructor(props) {
    this.speed = 0;
    this.acceleration = 0;
    Object.assign(this, props);

    this.group = new THREE.Object3D();

    const body = loadSprite(IMAGES.POLICE);
    const wheelScale = 0.26;
    const wheel1 = loadSprite(IMAGES.WHEEL, wheelScale);
    const wheel2 = loadSprite(IMAGES.WHEEL, wheelScale);

    const wheelXDiff = 0.263;
    const wheelY = -0.35;
    wheel1.position.set(-wheelXDiff, wheelY, 0);
    wheel2.position.set(wheelXDiff, wheelY, 0);

    this.wheels = [wheel1, wheel2];

    this.group.add(body);
    this.group.add(wheel1);
    this.group.add(wheel2);
  }

  update({ acceleration }) {
    this.wheels.forEach(wheel => {
      wheel.material.rotation += -this.speed * 0.01 * 10;
    });

    const friction = 0.95;

    this.acceleration += acceleration;
    this.acceleration *= friction;

    this.speed = this.acceleration;

    this.group.position.x += this.speed * 0.01;
  }
}
