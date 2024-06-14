import { PlayerBullet } from "./PlayerBullet.js";

/**
 * プレイヤーの左クリック用の弾
 */
export class PlayerSpreadShotBullet extends PlayerBullet {
  constructor(x, y, direction) {
    super(x, y, direction, 1);
  }
}
