import GameMap from "./GameMap.mjs";

import createCharacter from "../services/createCharacter.mjs";
import pickCharacterClass from "../services/pickCharacterClass.mjs";
import createEnemies from "../services/createEnemies.mjs";
import createChests from "../services/createChests.mjs";

import pkg from "enquirer";
const { Input, Select } = pkg;
import chalk from "chalk";

export default class Game {
  constructor() {
    this.player = null;
    this.boss = null;
    this.gameMap = [];
    this.currentTurn = 0;
  }

  async initialize() {
    try {
      const pickedChar = await pickCharacterClass();

      console.log(`${chalk.bgCyan(`You have chosen to be a ${pickedChar}.`)} \n`);

      const isChosen = await new Select({
        name: "choose",
        message: chalk.redBright(`Are you sure you want to be a ${pickedChar}?`),
        choices: [
          { name: "yes", message: "Yes.", value: true },
          { name: "no", message: "No.", value: false },
        ],
      }).run();

      if (isChosen == "no") {
        await this.initialize();
        return;
      }

      const name = await new Input({
        message: "What's your character name?",
      }).run();

      this.player = await createCharacter(pickedChar, name);

      const mapSizeChosen = await new Select({
        name: "map",
        message: chalk.blackBright(`Choose a size for your map`),
        choices: [
          { name: 5, message: "Small", value: 5 },
          { name: 10, message: "Medium", value: 10 },
          { name: 15, message: "Big", value: 15 },
        ],
      }).run();

      const enemies = await createEnemies(mapSizeChosen);
      this.boss = enemies.find((e) => e.hasOwnProperty("isBoss"));

      const chests = createChests(mapSizeChosen);

      this.gameMap = new GameMap(mapSizeChosen, this.player);
      await this.gameMap.generateMap(enemies, chests);

      console.log(`\nYou have created ${this.player.name} the ${pickedChar}!`);
      this.player.showStatus();
      this.player.inventory.showInventory();
      this.player.skills.showSkills();

      this.gameMap.printMap();

      console.log("Game initialized! Welcome to the RPG! \n");
      console.log(`Defeat ${this.boss.name} to win the game!`);

      while (this.player.isAlive) {
        const action = await new Select({
          name: "action",
          message: "What do you want to do?",
          choices: [
            { name: "move", message: "Move to next area.", value: "move" },
            { name: "inventory", message: "Open Inventory.", value: "inventory" },
            { name: "skills", message: "See Skills.", value: "skills" },
            { name: "status", message: "See Current Status.", value: "status" },
            { name: "useItem", message: "Use Item.", value: "useItem" },
            { name: "exit", message: "Exit game.", value: "exit" },
          ],
        }).run();

        await this.playerAction(action);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async playerAction(action) {
    switch (action) {
      case "inventory":
        this.player.inventory.showInventory();
        break;

      case "skills":
        this.player.skills.showSkills();
        break;

      case "status":
        this.player.showStatus();
        break;

      case "useItem":
        console.log("Feature to use an item...");
        break;

      case "move":
        const direction = await new Select({
          name: "direction",
          message: "Where would you like to go?",
          choices: [
            { name: "forward", message: "Forward", value: "forward" },
            { name: "right", message: "Right", value: "right" },
            { name: "left", message: "Left", value: "left" },
            { name: "backwards", message: "Backwards", value: "backwards" },
          ],
        }).run();
        this._handleMove(direction);
        break;

      case "exit":
        console.log(`\n ${chalk.red("👋 Goodbye, adventurer!")} \n`);
        process.exit(0);

      default:
        console.log(`\n ${chalk.gray("I don't understand that action.")} \n`);
    }
  }

  enemyAction() {}

  _handleMove(direction) {
    const [x, y] = this.gameMap.playerPosition;

    switch (direction) {
      case "forward":
        this._moveTo([x - 1, y]);
        break;

      case "backwards":
        this._moveTo([x + 1, y]);
        break;

      case "right":
        this._moveTo([x, y + 1]);
        break;

      case "left":
        this._moveTo([x, y - 1]);
        break;

      default:
        throw new Error(`${direction}: no such direction`);
    }
  }

  _moveTo(newCoordinates) {
    const { map } = this.gameMap;
    const [oldX, oldY] = this.gameMap.playerPosition;
    const [newX, newY] = newCoordinates;

    if (!(newX in map) || !(newY in map[newX])) {
      console.log(`\n ${chalk.red("Out of bounds! Move in other direction.")}`);
      this.gameMap.printMap();
      return;
    }

    const destination = map[newX][newY].type;

    if (destination === "wall") {
      console.log(`\n ${chalk.red("You hitted a wall! Move in other direction.")}`);
      this.gameMap.printMap();
      return;
    }

    map[oldX][oldY] = { type: "empty" };
    this.gameMap.playerPosition = [newX, newY];
    map[newX][newY] = { type: this.player };

    this.gameMap.printMap();
  }
}

/* 
Responsibilities of the Game Class
 - Manage Game State: Track characters (player and enemies), current turn, and game status 
   (e.g., win/lose conditions).
 - Handle Player Input: Process commands from the terminal (e.g., attack, use item, cast 
   skill).
 - Run the Game Loop: Execute turns, update character states, and process effects.
 - Coordinate Combat: Handle interactions between characters (e.g., attacks, skill usage).
 - Display Output: Use enquirer + chalk to show game events to the player.

Expanding the Game Class
    [] Add Enemy AI: Implement logic for enemies to use skills or items based on conditions 
    (e.g., low health, high mana).
    [] Support Multiple Enemies: Allow targeting specific enemies (e.g., attack goblin1).
    [] Add Game Progression: Introduce levels, quests, or a world map to make the game more 
    engaging.
    [] Save/Load State: Allow saving the game state to a file and loading it later.
*/
