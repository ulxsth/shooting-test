import {
  PLAYER_SHIP_WIDTH,
  PLAYER_SHIP_HEIGHT,
  PLAYER_SHIP_COLOR,
  PLAYER_SPEED,
  PLAYER_SHOOT_INTERVAL,
  PLAYER_HP,
  PLAYER_MAX_FOCUS_TIME,
} from "../constants.js";
import { gameState, getCanvasSize, getMousePosition, interactionState } from "../../index.js";
import { PlayerSpreadShotBullet } from "./PlayerSpreadShotBullet.js";
import { PlayerFocusShotBullet } from "./PlayerFocusShotBullet.js";
import { Entity } from "./Entity.js";
import { EnemyBullet } from "./EnemyBullet.js";
import { GameStatusEnum } from "../constants.js";

export class PlayerShip extends Entity {
  constructor(x, y) {
    super(x, y, PLAYER_SHIP_WIDTH, PLAYER_SHIP_HEIGHT, PLAYER_SHIP_COLOR, PLAYER_HP, 0);
    this.isFocusing = false;
    this.focusTime = 0;
    this.shootIntervalId = null;
  }

  update() {
    this.updateDirection();
    const { width: canvasWidth, height: canvasHeight } = getCanvasSize();
    const flags = interactionState.getAllFlags();

    // 移動
    if (!this.isFocusing) {
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
    }

    // 射撃
    if (flags.leftClick && this.shootIntervalId === null) {
      this.shootIntervalId = setInterval(() => {
        this.shoot();
      }, PLAYER_SHOOT_INTERVAL);
    } else if (!flags.leftClick && this.shootIntervalId !== null) {
      clearInterval(this.shootIntervalId);
      this.shootIntervalId = null;
    }

    // 狙い撃ち
    if (!this.isFocusing && flags.rightClick) {
      this.isFocusing = true;

    } else if (this.isFocusing && flags.rightClick && this.focusTime < PLAYER_MAX_FOCUS_TIME) {
      this.focusTime++;

    } else if (this.isFocusing && !flags.rightClick) {
      this.shootAtMousePosition();
      this.isFocusing = false;
      this.focusTime = 0;
    }

    // 衝突判定
    const bullets = gameState.getAll(EnemyBullet);
    bullets.forEach((bullet) => {
      if (this.isCollided(bullet)) {
        gameState.removeObject(bullet);
        this.damage(bullet.damage);
      }
    });

    // 死亡判定
    if (this.hp <= 0) {
      gameState.setGameStatus(GameStatusEnum.GAME_OVER);
    }
  }

  /**
   * マウスの位置を取得し、プレイヤーの方向を更新
   */
  updateDirection() {
    const { mouseX, mouseY } = getMousePosition();
    this.direction = Math.atan2(mouseY - this.y, mouseX - this.x);
  }

  /**
   * プレイヤーの向き（マウスカーソルのある方向）に散弾を発射する。
   * 左クリック用の射撃。
   */
  shoot() {
    const bullet = new PlayerSpreadShotBullet(this.x, this.y, this.direction);
    gameState.registerObject(bullet);
  }
  
  /**
   * マウスの位置に狙い撃ち弾を発射する。
   * 右クリック用の射撃。
   */
  shootAtMousePosition() {
    const { mouseX, mouseY } = getMousePosition();
    const damage = this.focusTime;
    const bullet = new PlayerFocusShotBullet(mouseX, mouseY, damage);
    gameState.registerObject(bullet);
  }
}
