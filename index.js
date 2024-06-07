import { handleKeyDown } from "./src/events/handleKeyDown";

const PLAYER_SPEED = 5;
const BULLET_SPEED = 10;

const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

let shootIntervalId;
let isShooting = false;

const objects = [
  { type: "player", x: 0, y: 0, width: 40, height: 50, color: "blue" },
];
const interactFlags = {
  up: false,
  down: false,
  left: false,
  right: false,
  leftClick: false,
  rightClick: false,
};

/**
 * 描画
 */
function draw() {
  // リセット
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 描画
  updatePlayerPosition();
  updateBulletPosition();
  objects.forEach((obj) => {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
  });

  // 再帰呼び出し
  window.requestAnimationFrame(draw);
}

/**
 * 初期化
 */
function init() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  // canvas の中心にプレイヤーを配置
  const center = getCenterOfCanvas();
  objects[0].x = center.x;
  objects[0].y = center.y;

  document.addEventListener("keydown", handleKeyDown);

  // キーが離されたときの処理
  document.addEventListener("keyup", (event) => {
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
  });

  // マウスボタンをクリックしたときの処理
  document.addEventListener("click", (event) => {
    console.log("click: " + event.button);
    if (event.button === 0) {
      shoot();
    }
  });

  // マウスボタンを押したときの処理
  document.addEventListener("mousedown", (event) => {
    console.log("mousedown: " + event.button);
    if (event.button === 0) {
      interactFlags.leftClick = true;
    } else if (event.button === 2) {
      interactFlags.rightClick = true;
    }
  });

  // マウスボタンを離したときの処理
  document.addEventListener("mouseup", (event) => {
    console.log("mouseup: " + event.button);
    if (event.button === 0) {
      interactFlags.leftClick = false;
    } else if (event.button === 2) {
      interactFlags.rightClick = false;
    }
  });

  // 右クリック時にメニューが表示されるのを防ぐ
  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });

  window.requestAnimationFrame(draw);
}

// プレイヤー関連
/**
 * プレイヤーを取得する
 * @returns {Object}
 */
const getPlayerObj = () => objects.find((obj) => obj.type === "player");

/**
 * プレイヤーの位置を更新する
 */
function updatePlayerPosition() {
  const player = getPlayerObj();
  if (interactFlags.up) player.y -= PLAYER_SPEED;
  if (interactFlags.down) player.y += PLAYER_SPEED;
  if (interactFlags.left) player.x -= PLAYER_SPEED;
  if (interactFlags.right) player.x += PLAYER_SPEED;
}

// 弾関連
/**
 * 射撃処理
 */
function shoot() {
  const player = getPlayerObj();
  const bullet = { type: "playerBullet", x: player.x, y: player.y, width: 10, height: 10, color: "red" };
  objects.push(bullet);
}

/**
 * プレイヤーの弾を取得する
 * @returns {Object[]}
 */
const getPlayerBullets = () => objects.filter((obj) => obj.type === "playerBullet");

/**
 * 弾の位置を更新する
 */
function updateBulletPosition() {
  const bullets = getPlayerBullets();
  if(!bullets) return;

  bullets.forEach((bullet) => {
    bullet.y += BULLET_SPEED;

    // 画面外に出た弾をobjectsから削除
    // TODO: 計算量が O(N) （Nはすべてのオブジェクト数）なので、パフォーマンスを改善する
    if (bullet.y < 0) {
        objects.splice(objects.indexOf(bullet), 1);
    }
  });
}

/**
 * キャンバスの中心を取得する
 * @returns {Object{x: number, y: number}}
 */
const getCenterOfCanvas = () => {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
};

init();
