import { interactionState } from "../../index.js";

export const handleMouseClick = (event) => {
  console.log("mousedown: " + event.button);
  if (event.button === 0) {
    interactionState.setFlag("leftClick", true);
  } else if (event.button === 2) {
    interactionState.setFlag("rightClick", true);
  }
}
