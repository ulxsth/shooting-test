export class GameState {
    constructor() {
    this.objects = [
      { type: "player", x: 0, y: 0, width: 40, height: 50, color: "blue" },
    ];

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

// プレイヤー関連
/**
 * プレイヤーを取得する
 * @returns {Object}
 */
getPlayerObj = () => this.objects.find((obj) => obj.type === "player");

/**
 * プレイヤーの位置を更新する
 */
updatePlayerPosition = () => {
  const player = getPlayerObj();
  const flags = gameState.getAllFlags();
  if (flags.up) player.y -= PLAYER_SPEED;
  if (flags.down) player.y += PLAYER_SPEED;
  if (flags.left) player.x -= PLAYER_SPEED;
  if (flags.right) player.x += PLAYER_SPEED;
}

  /**
   * フラグを更新する。
   * @param {string} flag フラグ名
   * @param {boolean} value フラグの値
   */
  setFlag(flag, value) {
    if (this.interactFlags.hasOwnProperty(flag)) {
      this.interactFlags[flag] = value;
    } else {
      throw new Error(`Invalid flag name: ${flag}`);
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
    if (this.interactFlags.hasOwnProperty(name)) {
      return this.interactFlags[name];
    } else {
      throw new Error(`Invalid flag name: ${name}`);
    }
  }
}

