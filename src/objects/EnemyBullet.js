import { Bullet } from "./Bullet.js";
import {
  ENEMY_BULLET_WIDTH,
  ENEMY_BULLET_HEIGHT,
  ENEMY_BULLET_COLOR,
  ENEMY_BULLET_DAMAGE,
  ENEMY_BULLET_SPEED,
} from "../constants.js";

export class EnemyBullet extends Bullet {
  constructor(x, y, direction) {
    super(
      x,
      y,
      ENEMY_BULLET_WIDTH,
      ENEMY_BULLET_HEIGHT,
      ENEMY_BULLET_COLOR,
      direction,
      ENEMY_BULLET_DAMAGE,
      ENEMY_BULLET_SPEED
    );
  }
}
