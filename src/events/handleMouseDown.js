export const handleMouseClick = (event) => {
  console.log("mousedown: " + event.button);
  if (event.button === 0) {
    interactFlags.leftClick = true;
  } else if (event.button === 2) {
    interactFlags.rightClick = true;
  }
}
