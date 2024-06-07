import handleClick from "./src/events/handleClick.js";
import handleContextMenu from "./src/events/handleContextMenu.js";
import handleKeyDown from "./src/events/handleKeyDown.js";
import handleKeyUp from "./src/events/handleKeyUp.js";
import handleMouseClick from "./src/events/handleMouseDown.js";
import handleMouseUp from "./src/events/handleMouseUp.js";
import GameState from "./src/states/GameState.js";

const PLAYER_SPEED = 5;
const BULLET_SPEED = 10;

const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

export const gameState = new GameState();
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

  // イベント登録
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("click", handleClick);
  document.addEventListener("mousedown", handleMouseClick);
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("contextmenu", handleContextMenu);

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
  const flags = gameState.getAllFlags();
  if (flags.up) player.y -= PLAYER_SPEED;
  if (flags.down) player.y += PLAYER_SPEED;
  if (flags.left) player.x -= PLAYER_SPEED;
  if (flags.right) player.x += PLAYER_SPEED;
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
