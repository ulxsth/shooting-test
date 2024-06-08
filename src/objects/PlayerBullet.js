import { PLAYER_BULLET_SPEED, PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT, PLAYER_BULLET_COLOR } from "../constants.js";
import { GameObject } from "./GameObject.js";

export class PlayerBullet extends GameObject {
  constructor(x, y, direction) {
    super(x, y, PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT, PLAYER_BULLET_COLOR);
    this.direction = direction;
  }

  updatePosition() {
    this.x += PLAYER_BULLET_SPEED * Math.cos(this.direction);
    this.y += PLAYER_BULLET_SPEED * Math.sin(this.direction);
  }
}

