export const handleKeyDown = (event) => {
  console.log("keydown: " + event.key);

  // プレイヤー操作
  switch (event.key) {
    case "ArrowUp":
    case "w":
      interactFlags.up = true;
      break;
    case "ArrowDown":
    case "s":
      interactFlags.down = true;
      break;
    case "ArrowLeft":
    case "a":
      interactFlags.left = true;
      break;
    case "ArrowRight":
    case "d":
      interactFlags.right = true;
      break;
  }
}
