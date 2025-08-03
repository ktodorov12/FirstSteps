import chalk from "chalk";
import pkg from "enquirer";
const { Select, Input } = pkg;

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

  decreaseItemQuantity(item, decreaseQty = 1) {
    if (!this.items[item.type][item.name]) {
      throw new Error(`${item.name} can't be found in the inventory!`);
    }

    this.items[item.type][item.name].quantity -= decreaseQty;
    let qty = this.items[item.type][item.name].quantity;

    if (qty == 0) {
      delete this.items[item.type][item.name];
      console.log(`You have no more ${item.name}'s in your inventory!`);
    } else {
      console.log(`You have | ${qty} | ${item.name} left in your inventory.`);
    }

    return this;
  }

  async dropItem(item) {
    if (!this.items[item.type][item.name]) {
      throw new Error(`${item.name} can't be found in the inventory!`);
    }

    const deleteChoice = await new Select({
      name: "Delete choice",
      message: chalk.red.bold(
        `\nDo you want to drop ${item.name} x | ${item.quantity} |?`
      ),
      choices: [
        {
          message: "Yes.",
          value: () => {
            delete this.items[item.type][item.name];
            console.log(`You have no more ${item.name}'s in your inventory!`);
            return true;
          },
        },
        {
          message: "No, I want to reduce the number.",
          value: async () => {
            const dropAmount = Number(
              await new Input({
                message: `You have | ${item.quantity} | ${item.name} in your inventory. How many would you like to drop?`,
              }).run()
            );

            if (dropAmount > item.quantity) {
              throw new Error("You cannot remove more than you have!");
            }

            if (dropAmount === item.quantity) {
              console.log(
                "\nYou could have just press yes, but anyway the item is droped :)"
              );
              delete this.items[item.type][item.name];
              console.log(`You have no more ${item.name}'s in your inventory!`);
              return true;
            }

            this.decreaseItemQuantity(item, dropAmount);
            return false;
          },
        },
        {
          message: "No.",
          value: () => {
            console.log(`You have | ${item.quantity} | ${item.name} in your inventory.`);
            return false;
          },
        },
      ],
    }).run();

    try {
      return await deleteChoice();
    } catch (error) {
      console.log(error);
    }
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

  async openInventory() {
    const items = [];

    if (Object.keys(this.items).length === 0) {
      console.log(chalk.gray("Your bag is empty..."));
    } else {
      for (let type in this.items) {
        for (let name in this.items[type]) {
          const item = this.items[type][name];
          items.push({
            message:
              `🔹 ${chalk.cyan(item.name)} x${item.quantity} ` +
              `(${chalk.yellow(item.statType)} +${item.stat})`,
            value: item,
          });
        }
      }

      items.push({
        message: `🔹 ${chalk.cyan.bold("Back.")}`,
        value: "back",
      });
    }

    const itemPicked = await new Select({
      name: "action",
      message: chalk.green.bold("\n🎒 === YOUR INVENTORY ==="),
      choices: items,
    }).run();

    return itemPicked;
  }
}
