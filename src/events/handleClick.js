import { gameState } from "../../index.js";

export const handleClick = (event) => {
  const player = gameState.getPlayerObj();
  const playerX = player.x;
  const playerY = player.y;
  const clickX = event.clientX;
  const clickY = event.clientY;

  console.log("click: " + event.button);
  if (event.button === 0) {
    player.shoot(Math.atan2(clickY - playerY, clickX - playerX));
  }
}
