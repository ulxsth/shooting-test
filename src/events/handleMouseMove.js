import { setMousePosition } from "../../index.js";

export const handleMouseMove = (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  setMousePosition(mouseX, mouseY);
};

