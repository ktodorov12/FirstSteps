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
}