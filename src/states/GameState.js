import { PlayerShip } from "../objects/PlayerShip.js";
import { PlayerBullet } from "../objects/PlayerBullet.js";
import { EnemyObject } from "../objects/EnemyObject.js";

import { getCanvasSize, interactionState } from "../../index.js";
import { Bullet } from "../objects/Bullet.js";

export class GameState {
  constructor() {
    this.objects = [
      new PlayerShip(0, 0),
    ];
  }

  /**
   * オブジェクトを登録する
   * @param {Object} obj 登録するオブジェクト
   */
  registerObject(obj) {
    this.objects.push(obj);
  }

  /**
   * 特定のクラスオブジェクトのうち、最初のオブジェクトを取得する。
   * @param {Function} classObj 取得するクラスオブジェクト
   * @returns {Object} 取得したオブジェクト
   */
  getFirst(classObj) {
    return this.objects.find((obj) => obj instanceof classObj);
  }

  /**
   * 特定のクラスオブジェクトをすべて取得する。
   * @param {Function} classObj 取得するクラスオブジェクト
   * @returns {Object[]} 取得したオブジェクトの配列
   */
  getAll(classObj) {
    return this.objects.filter((obj) => obj instanceof classObj);
  }

  /**
   * プレイヤーの位置を更新する
   */
  updatePlayerPosition = () => {
    const player = this.getFirst(PlayerShip);
    const flags = interactionState.getAllFlags();
    player.updatePosition(flags);
  }

  /**
   * 敵の状態を更新する
   */
  updateEnemyObjects() {
    const enemies = this.getAll(EnemyObject);
    enemies.forEach((enemy) => {
      if (enemy.hp <= 0) {
        clearInterval(enemy.shootIntervalId);
        this.objects.splice(this.objects.indexOf(enemy), 1);
      } else {
        enemy.update();
      }
    });
  }

  /**
   * 弾の位置を更新する
   */
  updateBulletsPosition = () => {
    const bullets = this.getAll(Bullet);

    bullets.forEach((bullet) => {
      bullet.updatePosition();

      // 画面外に出た弾をobjectsから削除
      // TODO: 計算量が O(N) （Nはすべてのオブジェクト数）なので、パフォーマンスを改善する
      const { width, height } = getCanvasSize();
      if (bullet.x < 0 || bullet.x > width ||
        bullet.y < 0 || bullet.y > height) {
        this.objects.splice(this.objects.indexOf(bullet), 1);
      }
    });
  }

  /**
   * PlayerBulletとの衝突判定を行う
   */
  checkBulletCollision() {
    const bullets = this.getAll(PlayerBullet);
    const enemies = this.getAll(EnemyObject);

    // TODO: O(N^2) なので、パフォーマンスを改善する
    bullets.forEach((bullet) => {
      enemies.forEach((enemy) => {
        if (bullet.isCollided(enemy)) {
          this.objects.splice(this.objects.indexOf(bullet), 1);
          enemy.damage(bullet.damage);
        }
      });
    });
  }
}
