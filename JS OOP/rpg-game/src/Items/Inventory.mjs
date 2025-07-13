import chalk from "chalk";

export default class Inventory {
  constructor() {
    this.items = {};
  }

  addItem(item) {
    if (!this.items[item.type]) {
      this.items[item.type] = {};
    }

    if (!this.items[item.type][item.name]) {
      this.items[item.type][item.name] = item;
      this.items[item.type][item.name].quantity = 0;
    }

    this.items[item.type][item.name].quantity += 1;

    return this;
  }

  decreaseItemQuantity(item) {
    if (!this.items[item.type][item.name]) {
      throw new Error(`${item.name} can't be found in the inventory!`);
    }

    this.items[item.type][item.name].quantity -= 1;
    let qty = this.items[item.type][item.name].quantity;

    if (qty == 0) {
      delete this.items[item.type][item.name];
      console.log(`You have no more ${item.name}'s in your inventory!`);
    } else {
      console.log(`You have | ${qty} | ${item.name} left in your inventory.`);
    }

    return this;
  }

  dropItem(item) {
    if (!this.items[item.type][item.name]) {
      throw new Error(`${item.name} can't be found in the inventory!`);
    }

    delete this.items[item.type][item.name];
    // TODO: add logic when there is more than one of said item (question to user).
  }

  showInventory() {
    console.log(chalk.green.bold("\n🎒 === YOUR INVENTORY ==="));

    if (Object.keys(this.items).length === 0) {
      console.log(chalk.gray("Your bag is empty..."));
    } else {
      for (let type in this.items) {
        for (let name in this.items[type]) {
          const item = this.items[type][name];
          console.log(
            `🔹 ${chalk.cyan(item.name)} x${item.quantity} ` +
              `(${chalk.yellow(item.statType)} +${item.stat})`
          );
        }
      }
    }

    console.log(`${chalk.green("=".repeat(30))} \n`);
  }
}
