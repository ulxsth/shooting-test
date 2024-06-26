import { GameObject } from "./GameObject.js";
import { gameState } from "../../index.js";

export class Entity extends GameObject {
  constructor(x, y, width, height, color, hp, direction) {
    super(x, y, width, height, color, direction);
    this.hp = hp;
  }

  damage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      gameState.removeObject(this);
    }
  }
}
