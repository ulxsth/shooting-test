
//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//                     永無BUG大仏
//

import { handleClick } from "./src/events/handleClick.js";
import { handleContextMenu } from "./src/events/handleContextMenu.js";
import { handleKeyDown } from "./src/events/handleKeyDown.js";
import { handleKeyUp } from "./src/events/handleKeyUp.js";
import { handleMouseClick } from "./src/events/handleMouseDown.js";
import { handleMouseUp } from "./src/events/handleMouseUp.js";
import { handleMouseMove } from "./src/events/handleMouseMove.js";
import { GameState } from "./src/states/GameState.js";
import { PlayerShip } from "./src/objects/PlayerShip.js";
import { EnemyObject } from "./src/objects/EnemyObject.js";
import { InteractionState } from "./src/states/InteractionState.js";

const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

export const gameState = new GameState();
export const interactionState = new InteractionState();
export let mouseX = 0;
export let mouseY = 0;

/**
 * 描画
 */
function draw() {
  // リセット
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 状態更新
  gameState.updatePlayerPosition();
  gameState.updateEnemyObjects();
  gameState.updateBulletsPosition();
  gameState.checkBulletCollision();

  // 描画
  gameState.objects.forEach((obj) => {
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
  const player = gameState.getFirst(PlayerShip);
  const center = getCenterOfCanvas();
  player.x = center.x;
  player.y = center.y;

  // fot test: 敵オブジェクトを追加
  const enemy = new EnemyObject(center.x, center.y + 50);
  gameState.objects.push(enemy);

  // イベント登録
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("click", handleClick);
  document.addEventListener("mousedown", handleMouseClick);
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("contextmenu", handleContextMenu);

  window.requestAnimationFrame(draw);
}

function getCenterOfCanvas() {
  return { x: canvas.width / 2, y: canvas.height / 2 };
}

export function getCanvasSize() {
  return { width: canvas.width, height: canvas.height };
}

export function getMousePosition() {
  return { mouseX, mouseY };
}

export function setMousePosition(x, y) {
  mouseX = x;
  mouseY = y;
}

init();
