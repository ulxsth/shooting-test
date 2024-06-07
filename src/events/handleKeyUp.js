export const handleKeyUp = (event) => {
  console.log("keyup: " + event.key);
  switch (event.key) {
    case "ArrowUp":
    case "w":
      interactFlags.up = false;
      break;
    case "ArrowDown":
    case "s":
      interactFlags.down = false;
      break;
    case "ArrowLeft":
    case "a":
      interactFlags.left = false;
      break;
    case "ArrowRight":
    case "d":
      interactFlags.right = false;
      break;
  }
}
