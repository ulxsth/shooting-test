import { GameObject } from "./GameObject";

export class Bullet extends GameObject {
  constructor(x, y, direction, damage, speed) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.damage = damage;
    this.speed = speed;
  }

  updatePosition() {
    this.x += this.speed * Math.cos(this.direction);
    this.y += this.speed * Math.sin(this.direction);
  }
}