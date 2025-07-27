import getRandomNumber from "../util/getRandomNumber.mjs";

export default class GameMap {
  constructor(size, player) {
    this._size = size;
    this._player = player;
    this.playerPosition = [0, 0];
    this.map = [];
  }

  async generateMap(enemies, chests) {
    const emptyMap = Array.from({ length: this._size }, () => {
      return Array.from({ length: this._size }, () => {
        // TODO: fix the idea for random wall generating
        return getRandomNumber(this._size) < (0.5 * this._size) / 100
          ? { type: "wall" }
          : { type: "empty" };
      });
    });
    this.map = emptyMap;

    // Place player
    const { space, position } = getRandomEmptySpace(this.map, this._size);
    this.playerPosition = position;
    space.type = this._player;

    // Place enemies
    enemies.forEach((enemy) => {
      const { space } = getRandomEmptySpace(this.map, this._size);
      space.type = "enemy";
      space.payload = enemy;
    });

    // Place chests (items)
    chests.forEach((chest) => {
      const { space } = getRandomEmptySpace(this.map, this._size);
      chest.opened = false;
      space.type = "chest";
      space.payload = chest;
    });

    return this;
  }

  printMap() {
    console.log("\n🗺️  Current Map:");
    for (let row of this.map) {
      let line = row
        .map((cell) => {
          if (cell.type === this._player) return "🗿";
          if (cell.payload === this.boss && cell.isAlive == false) return "👑";
          if (cell.type === "enemy" && cell.isAlive == false) return "👹";
          if (cell.type === "chest" && cell.opened == true) return "💰";
          if (cell.type === "wall") return " | ";
          return " . ";
        })
        .join(" ");
      console.log(line);
    }
    console.log("");
  }
}

function getRandomEmptySpace(map, size) {
  let x, y;
  do {
    x = getRandomNumber(size);
    y = getRandomNumber(size);
  } while (map[x][y].type !== "empty");

  return {
    position: [x, y],
    space: map[x][y],
  };
}
