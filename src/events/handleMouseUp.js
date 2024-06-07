export const handleMouseUp = (event) => {
  console.log("mouseup: " + event.button);
  if (event.button === 0) {
    interactFlags.leftClick = false;
  } else if (event.button === 2) {
    interactFlags.rightClick = false;
  }
}
