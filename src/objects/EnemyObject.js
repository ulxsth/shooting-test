import { GameObject } from "./GameObject.js";
import { ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_COLOR, ENEMY_HP } from "../constants.js";

export class EnemyObject extends GameObject {
  constructor(x, y) {
    super(x, y, ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_COLOR);
    this.hp = ENEMY_HP;
  }

  /**
   * ダメージを受ける
   * @param {number} damage
   */
  damage(damage) {
    this.hp -= damage;
  }
}

