import { GameObject } from "./GameObject.js";
import {
  PLAYER_SHIP_WIDTH,
  PLAYER_SHIP_HEIGHT,
  PLAYER_SHIP_COLOR,
  PLAYER_SPEED,
  PLAYER_SHOOT_INTERVAL,
} from "../constants.js";
import { gameState, getCanvasSize, getMousePosition } from "../../index.js";
import { PlayerBullet } from "./PlayerBullet.js";
import { PLAYER_BULLET_DAMAGE } from "../constants.js";

export class PlayerShip extends GameObject {
  constructor(x, y) {
    super(x, y, PLAYER_SHIP_WIDTH, PLAYER_SHIP_HEIGHT, PLAYER_SHIP_COLOR);
    this.shootIntervalId = null;
  }

  /**
   * 射撃処理
   * @param {number} direction 射撃方向（ラジアン角度で指定）
   */
  shoot(direction) {
    const bullet = new PlayerBullet(this.x, this.y, direction, PLAYER_BULLET_DAMAGE);
    gameState.registerObject(bullet);
  }

  updatePosition(flags) {
    const { width: canvasWidth, height: canvasHeight } = getCanvasSize();

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

    if(flags.leftClick && this.shootIntervalId === null) {
      this.shootIntervalId = setInterval(() => {
        const { mouseX, mouseY } = getMousePosition();
        const direction = Math.atan2(mouseY - this.y, mouseX - this.x);
        this.shoot(direction);
        console.log(mouseX, mouseY, this.x, this.y);
      }, PLAYER_SHOOT_INTERVAL);
    } else if (!flags.leftClick && this.shootIntervalId !== null) {
      clearInterval(this.shootIntervalId);
      this.shootIntervalId = null;
    }
  }
}
