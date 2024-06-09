import { gameState } from "../../index.js";

export const handleMouseMove = (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  gameState.mouseX = mouseX;
  gameState.mouseY = mouseY;
};

