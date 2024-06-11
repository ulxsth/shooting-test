import { PlayerShip } from "../objects/PlayerShip.js";
import { PlayerBullet } from "../objects/PlayerBullet.js";
import { EnemyObject } from "../objects/EnemyObject.js";

export class GameState {
  constructor() {
    this.objects = [
      new PlayerShip(0, 0),
    ];

    // TODO: ビットフラグ形式にリファクタ
    this.interactFlags = {
      up: false,
      down: false,
      left: false,
      right: false,
      leftClick: false,
      rightClick: false,
    };
  }

  /**
   * オブジェクトを登録する
   * @param {Object} obj 登録するオブジェクト
   */
  registerObject(obj) {
    this.objects.push(obj);
  }

  /**
   * 特定のフラグが立っているかどうかを取得する。
   * @param {string} name フラグ名
   * @returns {boolean} フラグの値
   */
  isFlag(name) {
    if (this.interactFlags.hasOwnProperty(name)) {
      return this.interactFlags[name];
    } else {
      throw new Error(`Invalid flag name: ${name}`);
    }
  }

  /**
   * フラグを更新する。
   * @param {string} flag フラグ名
   * @param {boolean} value フラグの値
   */
  setFlag(flag, value) {
    if (this.interactFlags.hasOwnProperty(flag)) {
      this.interactFlags[flag] = value;
    } else {
      throw new Error(`Invalid flag name: ${flag}`);
    }
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
    const flags = this.interactFlags;
    player.updatePosition(flags);
  };

  /**
   * 弾の位置を更新する
   */
  updateBulletsPosition() {
    const bullets = this.getAll(PlayerBullet);

    bullets.forEach((bullet) => {
      bullet.updatePosition();

      // 画面外に出た弾をobjectsから削除
      // TODO: 全方向に確認する
      // TODO: 計算量が O(N) （Nはすべてのオブジェクト数）なので、パフォーマンスを改善する
      if (bullet.y < 0) {
        this.objects.splice(this.objects.indexOf(bullet), 1);
      }
    });
  }

  /**
   * 敵オブジェクトの状態を更新する
   */
  updateEnemyObjects() {
    const enemies = this.getAll(EnemyObject);
    enemies.forEach((enemy) => {
      if (enemy.hp <= 0) {
        this.objects.splice(this.objects.indexOf(enemy), 1);
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
