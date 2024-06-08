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

  // プレイヤー関連
  /**
   * プレイヤーを取得する
   * @returns {Object}
   */
  getPlayerObj = () => this.objects.find((obj) => obj instanceof PlayerShip);

  /**
   * プレイヤーの位置を更新する
   */
  updatePlayerPosition = () => {
    const player = this.getPlayerObj();
    const flags = this.interactFlags;
    player.updatePosition(flags);
  };

  // 弾関連
  /**
   * 射撃処理
   * @param {number} direction 射撃方向（ラジアン角度で指定）
   */
  shoot(direction) {
    const player = this.getPlayerObj();
    const bullet = new PlayerBullet(player.x, player.y, direction);
    this.objects.push(bullet);
  }

  /**
   * プレイヤーの弾を取得する
   * @returns {Object[]}
   */
  getAllPlayerBullets = () =>
    this.objects.filter((obj) => obj instanceof PlayerBullet);

  /**
   * 弾の位置を更新する
   */
  updateBulletsPosition() {
    const bullets = this.getAllPlayerBullets();

    bullets.forEach((bullet) => {
      bullet.updatePosition();

      // 画面外に出た弾をobjectsから削除
      // TODO: 計算量が O(N) （Nはすべてのオブジェクト数）なので、パフォーマンスを改善する
      if (bullet.y < 0) {
        this.objects.splice(this.objects.indexOf(bullet), 1);
      }
    });
  }

  // 敵オブジェクト関連
  /**
   * 敵オブジェクトを取得する
   * @returns {Object[]}
   */
  getAllEnemyObjects = () => this.objects.filter((obj) => obj instanceof EnemyObject);

  /**
   * 敵オブジェクトの状態を更新する
   */
  updateEnemyObjects() {
    const enemies = this.getAllEnemyObjects();
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
    const bullets = this.getAllPlayerBullets();
    const enemies = this.getAllEnemyObjects();

    // TODO: O(N^2) なので、パフォーマンスを改善する
    bullets.forEach((bullet, index) => {
      enemies.forEach((enemy) => {
        if (bullet.isCollided(enemy)) {
          this.objects.splice(this.objects.indexOf(bullet), 1);
          enemy.damage(10);
        }
      });
    });
  }
}
