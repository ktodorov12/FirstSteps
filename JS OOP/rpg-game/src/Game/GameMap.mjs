import Character from "../Characters/Character.mjs";
import createEnemies from "../services/createEnemies.mjs";
import getRandomNumber from "../util/getRandomNumber.mjs";

export default class GameMap {
  constructor(size, player) {
    this._size = size;
    this._player = player;
    this.map = [];
  }

  async generateMap() {
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
    const playerSpace = getRandomEmptySpace(this.map, this._size);
    playerSpace.type = this._player;

    // Place enemies
    const enemies = await createEnemies(this._size);
    enemies.forEach((enemy) => {
      const enemySpace = getRandomEmptySpace(this.map, this._size);
      enemySpace.type = enemy;
    });


    // ==========================================================
    // TODO:generate random amount of chests (maybe class, based on the size)
    // that hold a random item;

    // TODO: place the chest randomly on the map (the place should be empty);

    return this;
  }

  printMap() {
    console.log("\n🗺️  Current Map:");
    for (let row of this.map) {
      let line = row
        .map((cell) => {
          if (cell.type === this._player) return "🙍‍♂️";
          if (cell.type instanceof Character) return "👹"; //&& !cell.defeated
          // if (cell.type === "boss" ) return "👑"; // && !cell.defeated
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

  return map[x][y];
}
