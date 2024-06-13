import {
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
  ENEMY_COLOR,
  ENEMY_HP,
  ENEMY_SHOOT_INTERVAL,
} from "../constants.js";
import { gameState } from "../../index.js";
import { GameObject } from "./GameObject.js";
import { PlayerBullet } from "./PlayerBullet.js";
import { EnemyBullet } from "./EnemyBullet.js";

export class EnemyObject extends GameObject {
  constructor(x, y) {
    super(x, y, ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_COLOR);
    this.hp = ENEMY_HP;
    this.direction = 0;
    this.shootIntervalId = null;
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
    this.checkBulletCollision();
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

  
  /**
   * PlayerBulletとの衝突判定を行う
   */
  checkBulletCollision() {
    const bullets = gameState.getAll(PlayerBullet);
    const enemies = gameState.getAll(EnemyObject);
  
      // TODO: O(N^2) なので、パフォーマンスを改善する
    bullets.forEach((bullet) => {
      enemies.forEach((enemy) => {
        if (bullet.isCollided(enemy)) {
          gameState.removeObject(bullet);
          enemy.damage(bullet.damage);
          console.log(enemy.hp);
        }
      });
    });
  }
}
