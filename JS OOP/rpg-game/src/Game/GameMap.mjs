export default class GameMap {
  constructor(size, player) {
    this._size = size;
    this._player = player;
    this.map = [];
  }

  generateMap() {
    const emptyMap = Array.from({ length: this._size }, () => {
      return Array.from({ length: this._size }, () => {
        // TODO: fix the idea for random wall generating
        return randomNumber(this._size) < (0.5 * this._size) / 100
          ? { type: "wall" }
          : { type: "empty" };
      });
    });
    this.map = emptyMap;

    let space = this.map[randomNumber(this._size)][randomNumber(this._size)];
    while (space.type !== "empty") {
      space = this.map[randomNumber(this._size)][randomNumber(this._size)];
    }
    space.type = this._player;

    // ==========================================================
    /* TODO: generate radom amount of enemies (based on the size)
        and random type of enemies (based on those we have);
    */

    /* TODO: place the created enemies randomly on the map;
        (the place should be empty)
    */

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
          if (cell.type === "enemy" && !cell.defeated) return "👹";
          if (cell.type === "boss" && !cell.defeated) return "👑";
          if (cell.type === "wall") return " | "
          return " . ";
        })
        .join(" ");
      console.log(line);
    }
    console.log("");
  }
}

function randomNumber(border) {
  return Math.floor(Math.random() * border);
}
