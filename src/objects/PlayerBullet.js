import { PLAYER_BULLET_SPEED, PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT, PLAYER_BULLET_COLOR } from "../constants.js";
import { GameObject } from "./GameObject.js";

export class PlayerBullet extends GameObject {
  constructor(x, y) {
    super(x, y, PLAYER_BULLET_WIDTH, PLAYER_BULLET_HEIGHT, PLAYER_BULLET_COLOR);
  }

  updatePosition() {
    this.y += PLAYER_BULLET_SPEED;
  }
}

