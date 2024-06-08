import { GameObject } from "./GameObject.js";
import {
  PLAYER_SHIP_WIDTH,
  PLAYER_SHIP_HEIGHT,
  PLAYER_SHIP_COLOR,
  PLAYER_SPEED,
} from "../constants.js";
import { canvasWidth, canvasHeight } from "../index.js";

export class PlayerShip extends GameObject {
  constructor(x, y) {
    super(x, y, PLAYER_SHIP_WIDTH, PLAYER_SHIP_HEIGHT, PLAYER_SHIP_COLOR);
  }

  updatePosition(flags) {
    if (flags.up && this.y > 0) this.y -= PLAYER_SPEED;
    if (flags.left && this.x > 0) this.x -= PLAYER_SPEED;
    if (flags.down && this.y < canvasHeight - PLAYER_SHIP_HEIGHT)
      this.y += PLAYER_SPEED;
    if (flags.right && this.x < canvasWidth - PLAYER_SHIP_WIDTH)
      this.x += PLAYER_SPEED;
  }
}
