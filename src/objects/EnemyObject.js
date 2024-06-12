import { ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_COLOR, ENEMY_HP } from "../constants.js";
import { gameState } from "../../index.js";
import { GameObject } from "./GameObject.js";

export class EnemyObject extends GameObject {
  constructor(x, y) {
    super(x, y, ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_COLOR);
    this.hp = ENEMY_HP;
    this.direction = 0;
  }

  /**
   * ダメージを受ける
   * @param {number} damage
   */
  damage(damage) {
    this.hp -= damage;
  }

  /**
   * 弾を発射する
   */
  shoot() {
    const bullet = new EnemyBullet(this.x, this.y, this.direction);
    gameState.registerObject(bullet);
  }

  /**
   * 更新処理
   */
  update() {
    this.shoot();
  }
}

