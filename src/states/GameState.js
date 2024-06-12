import { PlayerShip } from "../objects/PlayerShip.js";
import { PlayerBullet } from "../objects/PlayerBullet.js";
import { EnemyObject } from "../objects/EnemyObject.js";

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
   * すべてのオブジェクトの状態を更新する
   */
  update() {
    this.objects.forEach((obj) => {
      obj.update();
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
