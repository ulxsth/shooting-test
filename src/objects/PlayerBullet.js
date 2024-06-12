import { PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT, PLAYER_BULLET_COLOR } from "../constants.js";
import { GameObject } from "./GameObject.js";

export class PlayerBullet extends GameObject {
  constructor(x, y, direction, damage, speed) {
    super(x, y, PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT, PLAYER_BULLET_COLOR);
    this.direction = direction;
    this.damage = damage;
    this.speed = speed;
  }

  updatePosition() {
    this.x += this.speed * Math.cos(this.direction);
    this.y += this.speed * Math.sin(this.direction);
  }
}

