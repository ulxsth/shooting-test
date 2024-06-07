import { GameObject } from "./GameObject.js";
import { PLAYER_SHIP_WIDTH, PLAYER_SHIP_HEIGHT, PLAYER_SHIP_COLOR, PLAYER_SPEED } from "../constants.js";

export class PlayerShip extends GameObject {
  constructor(x, y) {
    super(x, y, PLAYER_SHIP_WIDTH, PLAYER_SHIP_HEIGHT, PLAYER_SHIP_COLOR);
  }

  updatePosition(flags) {
    if (flags.up) this.y -= PLAYER_SPEED;
    if (flags.down) this.y += PLAYER_SPEED;
    if (flags.left) this.x -= PLAYER_SPEED;
    if (flags.right) this.x += PLAYER_SPEED;
  }
}

