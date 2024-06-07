import { BULLET_SPEED } from "../constants.js";
import { GameState } from "../states/GameState.js";
import { GameObject } from "./GameObject.js";

export class PlayerBullet extends GameObject {
  constructor(x, y) {
    super(x, y);
  }

  updatePosition() {
    this.y -= BULLET_SPEED;
  }
}

