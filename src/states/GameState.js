import { PlayerShip } from "../objects/PlayerShip.js";
import { GameStatusEnum } from "../constants.js";

export class GameState {
  constructor() {
    this.objects = [
      new PlayerShip(0, 0),
    ];
    this.gameStatus = GameStatusEnum.PLAYING;
  }

  /**
   * ゲームの状態を変更する
   * @param {number} status 変更するゲームの状態（GameStatusEnum）
   */
  setGameStatus(status) {
    if (!Object.values(GameStatusEnum).includes(status)) {
      throw new Error("Invalid game status");
    }
    this.gameStatus = status;
  }

  /**
   * オブジェクトを登録する
   * @param {Object} obj 登録するオブジェクト
   */
  registerObject(obj) {
    this.objects.push(obj);
  }

  /**
   * オブジェクトを削除する
   * @param {Object} obj 削除するオブジェクト
   */
  removeObject(obj) {
    this.objects.splice(this.objects.indexOf(obj), 1);
  }

  /**
   * 特定のクラスオブジェクトのうち、最初のオブジェクトを取得する。
   * @param {Function} classObj 取得するクラスオブジェクト
   * @returns {Object} 取得したオブジェクト
   */
  getFirst(classObj) {
    return this.objects.find((obj) => obj instanceof classObj);
  }

  /**
   * 特定のクラスオブジェクトをすべて取得する。
   * @param {Function} classObj 取得するクラスオブジェクト
   * @returns {Object[]} 取得したオブジェクトの配列
   */
  getAll(classObj) {
    return this.objects.filter((obj) => obj instanceof classObj);
  }

  /**
   * すべてのオブジェクトの状態を更新する
   */
  update() {
    if (this.gameStatus === GameStatusEnum.GAME_OVER) {
      return;
    }

    this.objects.forEach((obj) => {
      obj.update();
    });
  }
}
