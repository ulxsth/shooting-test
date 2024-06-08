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
   */
  shoot() {
    const player = this.getPlayerObj();
    const bullet = new PlayerBullet(player.x, player.y);
    this.objects.push(bullet);
  }

  /**
   * プレイヤーの弾を取得する
   * @returns {Object[]}
   */
  getPlayerBullets = () =>
    this.objects.filter((obj) => obj instanceof PlayerBullet);

  /**
   * 弾の位置を更新する
   */
  updateBulletsPosition() {
    const bullets = this.getPlayerBullets();

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
  getEnemyObjects = () => this.objects.filter((obj) => obj instanceof EnemyObject);

  /**
   * PlayerBulletとの衝突判定を行う
   */
  checkBulletCollision() {
    const bullets = this.getPlayerBullets();
    const enemies = this.getEnemyObjects();

    // TODO: O(N^2) なので、パフォーマンスを改善する
    bullets.forEach((bullet) => {
      enemies.forEach((enemy) => {
        
      });
    });
  }

  /**
   * 任意の2つのオブジェクトに重なっている部分があるかを検査する。
   * @param {Object} obj1
   * @param {Object} obj2
   * @returns {boolean}
   */
  isCollided = (obj1, obj2) => {
    // 長方形を (x..x+w), (y..y+h) のふたつの範囲として捉え、
    // 2つのオブジェクトのそれぞれの範囲が重なっているかを考える
    
    const isXOverlapped = obj1.x < (obj2.x + obj2.width) &&
                           (obj1.x + obj1.width) > obj2.x ||
                           obj2.x < (obj1.x + obj1.width) &&
                           (obj2.x + obj2.width) > obj1.x;

    const isYOverlapped = obj1.y < (obj2.y + obj2.height) &&
                           (obj1.y + obj1.height) > obj2.y ||
                           obj2.y < (obj1.y + obj1.height) &&
                           (obj2.y + obj2.height) > obj1.y;
                           
    return isXOverlapped && isYOverlapped;
  };
}
