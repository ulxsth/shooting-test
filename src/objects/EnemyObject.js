import {
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
  ENEMY_COLOR,
  ENEMY_HP,
  ENEMY_SHOOT_INTERVAL,
} from "../constants.js";
import { gameState } from "../../index.js";
import { PlayerBullet } from "./PlayerBullet.js";
import { EnemyBullet } from "./EnemyBullet.js";
import { Entity } from "./Entity.js";

export class EnemyObject extends Entity {
  constructor(x, y) {
    super(x, y, ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_COLOR, ENEMY_HP, 0);
    this.shootIntervalId = null;
  }

  /**
   * ダメージを受ける
   * @param {number} damage
   */
  damage(damage) {
    console.log("damaged!");
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
    const bullets = gameState.getAll(PlayerBullet);
    bullets.forEach((bullet) => {
      if (this.isCollided(bullet)) {
        gameState.removeObject(bullet);
        this.damage(bullet.damage);
      }
    });

    if(this.hp <= 0) {
      clearInterval(this.shootIntervalId);
      gameState.removeObject(this);
    }

    if (!this.shootIntervalId) {
      this.shootIntervalId = setInterval(() => {
        this.shoot();
      }, ENEMY_SHOOT_INTERVAL);
    }
  }
}
