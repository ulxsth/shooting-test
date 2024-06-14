import { Bullet } from "./Bullet.js";

export class PlayerFocusShotBullet extends Bullet {
  constructor(x, y, direction, damage, speed) {
    super(x, y, direction, damage, speed);
    this.existTime = 5;
  }

  update() {
    this.existTime--;
    if (this.existTime <= 0) {
      gameState.removeObject(this);
    }
  }
}
