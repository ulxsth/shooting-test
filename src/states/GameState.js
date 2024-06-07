import { PLAYER_SPEED, BULLET_SPEED } from "../constants.js";
import { PlayerShip } from "../objects/PlayerShip.js";

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
  // フラグ関連
  /**
   * すべてのフラグを取得する。
   * @returns {Object} フラグ
   */
  getAllFlags() {
    return this.interactFlags;
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
    const flags = this.getAllFlags();
    if (flags.up) player.y -= PLAYER_SPEED;
    if (flags.down) player.y += PLAYER_SPEED;
    if (flags.left) player.x -= PLAYER_SPEED;
    if (flags.right) player.x += PLAYER_SPEED;
  };

  // 弾関連
  /**
   * 射撃処理
   */
  shoot() {
    const player = this.getPlayerObj();
    const bullet = {
      type: "playerBullet",
      x: player.x,
      y: player.y,
      width: 10,
      height: 10,
      color: "red",
    };
    this.objects.push(bullet);
  }

  /**
   * プレイヤーの弾を取得する
   * @returns {Object[]}
   */
  getPlayerBullets = () =>
    this.objects.filter((obj) => obj.type === "playerBullet");

  /**
   * 弾の位置を更新する
   */
  updateBulletPosition() {
    const bullets = this.getPlayerBullets();
    if (!bullets) return;

    bullets.forEach((bullet) => {
      bullet.y += BULLET_SPEED;

      // 画面外に出た弾をobjectsから削除
      // TODO: 計算量が O(N) （Nはすべてのオブジェクト数）なので、パフォーマンスを改善する
      if (bullet.y < 0) {
        this.objects.splice(this.objects.indexOf(bullet), 1);
      }
    });
  }
}
