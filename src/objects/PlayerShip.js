import { GameObject } from "./GameObject.js";
import { PLAYER_SHIP_WIDTH, PLAYER_SHIP_HEIGHT, PLAYER_SHIP_COLOR } from "../constants.js";

export class PlayerShip extends GameObject {
  constructor(x, y) {
    super(x, y, PLAYER_SHIP_WIDTH, PLAYER_SHIP_HEIGHT, PLAYER_SHIP_COLOR);
  }
}

