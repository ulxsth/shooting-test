class GameState {
  constructor() {
    // TODO: ビットフラグ形式にリファクタ
    this.interactFlags = {
      up: false,
      down: false,
      left: false,
      right: false,
      leftClick: false,
      rightClick: false,
    };
  }

  /**
   * フラグを更新する。
   * @param {string} flag フラグ名
   * @param {boolean} value フラグの値
   */
  updateFlags(flag, value) {
    if (this.interactFlags.hasOwnProperty(flag)) {
      this.interactFlags[flag] = value;
    }
  }

  /**
   * すべてのフラグを取得する。
   * @returns {Object} フラグ
   */
  getAllFlags() {
    return this.interactFlags;
  }

  /**
   * 特定のフラグが立っているかどうかを取得する。
   * @param {string} name フラグ名
   * @returns {boolean} フラグの値
   */
  isFlag(name) {
    return this.interactFlags[name];
  }
}

export default GameState;

