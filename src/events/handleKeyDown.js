import { gameState } from "../../index.js";

export const handleKeyDown = (event) => {
  console.log("keydown: " + event.key);

  // プレイヤー操作
  switch (event.key) {
    case "ArrowUp":
    case "w":
      gameState.setFlag("up", true);
      break;
    case "ArrowDown":
    case "s":
      gameState.setFlag("down", true);
      break;
    case "ArrowLeft":
    case "a":
      gameState.setFlag("left", true);
      break;
    case "ArrowRight":
    case "d":
      gameState.setFlag("right", true);
      break;
  }
}
