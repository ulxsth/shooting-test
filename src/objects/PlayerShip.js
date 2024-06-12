import { GameObject } from "./GameObject.js";
import {
  PLAYER_SHIP_WIDTH,
  PLAYER_SHIP_HEIGHT,
  PLAYER_SHIP_COLOR,
  PLAYER_SPEED,
  PLAYER_SHOOT_INTERVAL,
} from "../constants.js";
import { gameState, getCanvasSize, getMousePosition, interactionState } from "../../index.js";
import { PlayerBullet } from "./PlayerBullet.js";

export class PlayerShip extends GameObject {
  constructor(x, y) {
    super(x, y, PLAYER_SHIP_WIDTH, PLAYER_SHIP_HEIGHT, PLAYER_SHIP_COLOR);
    this.shootIntervalId = null;
  }

  /**
   * 射撃処理
   */
  shoot() {
    this.updateDirection();
    const bullet = new PlayerBullet(this.x, this.y, this.direction);
    gameState.registerObject(bullet);
  }

  update() {
    const { width: canvasWidth, height: canvasHeight } = getCanvasSize();
    const flags = interactionState.getAllFlags();

    if (flags.up && this.y - PLAYER_SPEED >= 0) {
      this.y -= PLAYER_SPEED;
    }
    if (flags.left && this.x - PLAYER_SPEED >= 0) {
      this.x -= PLAYER_SPEED;
    }
    if (flags.down && this.y + PLAYER_SPEED + PLAYER_SHIP_HEIGHT <= canvasHeight) {
      this.y += PLAYER_SPEED;
    }
    if (flags.right && this.x + PLAYER_SPEED + PLAYER_SHIP_WIDTH <= canvasWidth) {
      this.x += PLAYER_SPEED;
    }

    // TODO: updatePosition で射撃処理してるのおかしくない？
    if(flags.leftClick && this.shootIntervalId === null) {
      this.shootIntervalId = setInterval(() => {
        this.shoot();
      }, PLAYER_SHOOT_INTERVAL);
    } else if (!flags.leftClick && this.shootIntervalId !== null) {
      clearInterval(this.shootIntervalId);
      this.shootIntervalId = null;
    }
  }

  /**
   * マウスの位置を取得し、プレイヤーの方向を更新
   */
  updateDirection() {
    const { mouseX, mouseY } = getMousePosition();
    this.direction = Math.atan2(mouseY - this.y, mouseX - this.x);
  }
}
