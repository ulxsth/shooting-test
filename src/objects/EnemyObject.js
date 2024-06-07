import { GameObject } from "./GameObject.js";
import { ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_COLOR } from "../constants.js";

export class EnemyObject extends GameObject {
  constructor(x, y) {
    super(x, y, ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_COLOR);
  }
}

