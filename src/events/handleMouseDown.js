import { gameState } from "../../index.js";

export const handleMouseClick = (event) => {
  console.log("mousedown: " + event.button);
  if (event.button === 0) {
    gameState.setFlag("leftClick", true);
  } else if (event.button === 2) {
    gameState.setFlag("rightClick", true);
  }
}
