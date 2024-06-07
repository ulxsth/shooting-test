import { gameState } from "../../index.js";

export const handleClick = (event) => {
  console.log("click: " + event.button);
  if (event.button === 0) {
    gameState.shoot();
  }
}
