import { interactionState } from "../../index.js";

export const handleMouseUp = (event) => {
  console.log("mouseup: " + event.button);
  if (event.button === 0) {
    interactionState.setFlag("leftClick", false);
  } else if (event.button === 2) {
    interactionState.setFlag("rightClick", false);
  }
}
