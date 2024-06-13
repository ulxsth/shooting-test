import {
  PLAYER_BULLET_WIDTH,
  PLAYER_BULLET_HEIGHT,
  PLAYER_BULLET_COLOR,
  PLAYER_BULLET_DAMAGE,
  PLAYER_BULLET_SPEED,
} from "../constants.js";
import { Bullet } from "./Bullet.js";

export class PlayerBullet extends Bullet {
  constructor(x, y, direction) {
    super(
      x,
      y,
      PLAYER_BULLET_WIDTH,
      PLAYER_BULLET_HEIGHT,
      PLAYER_BULLET_COLOR,
      direction,
      PLAYER_BULLET_DAMAGE,
      PLAYER_BULLET_SPEED
    );
  }
}
