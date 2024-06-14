import { gameState } from "../../index.js";
import { PlayerBullet } from "./PlayerBullet.js";

/**
 * プレイヤーの右クリック（狙い撃ち）用の弾
 * damage: 100
 */
export class PlayerFocusShotBullet extends PlayerBullet {
  constructor(x, y, damage) {
    super(x, y, 0, damage);
    this.existTime = 5;
  }

  update() {
    this.existTime--;
    if (this.existTime <= 0) {
      gameState.removeObject(this);
    }
  }
}
