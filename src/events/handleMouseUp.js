import { gameState } from "../../index.js";

export const handleMouseUp = (event) => {
  console.log("mouseup: " + event.button);
  if (event.button === 0) {
    gameState.setFlag("leftClick", false);
  } else if (event.button === 2) {
    gameState.setFlag("rightClick", false);
  }
}
