import { gameState } from "../../index.js";

export const handleKeyUp = (event) => {
  console.log("keyup: " + event.key);
  switch (event.key) {
    case "ArrowUp":
    case "w":
      gameState.setFlag("up", false);
      break;
    case "ArrowDown":
    case "s":
      gameState.setFlag("down", false);
      break;
    case "ArrowLeft":
    case "a":
      gameState.setFlag("left", false);
      break;
    case "ArrowRight":
    case "d":
      gameState.setFlag("right", false);
      break;
  }
}
