import { gameState } from "../../index.js";
import { PlayerBullet } from "./PlayerBullet.js";

/**
 * プレイヤーの狙い撃ち弾
 * direction: 0
 * damage: 100
 * speed: 0
 */
export class PlayerFocusShotBullet extends PlayerBullet {
  constructor(x, y) {
    super(x, y, 0);
    this.existTime = 5;
  }

  update() {
    this.existTime--;
    if (this.existTime <= 0) {
      gameState.removeObject(this);
    }
  }
}
