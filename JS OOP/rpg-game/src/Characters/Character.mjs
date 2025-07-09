export default class Character {
  constructor(
    name,
    health,
    mana,
    basePhysicalAttack,
    baseMagicPower,
    baseDeffence,
    inventory,
    skills
  ) {
    this.name = name;
    this.health = health;
    this.mana = mana;
    this.basePhysicalAttack = basePhysicalAttack;
    this.baseMagicPower = baseMagicPower;
    this.baseDeffence = baseDeffence;
    this.inventory = inventory;
    this.skills = skills;
    this.equipedItems = {
      leftHand: null,
      rightHand: null,
      head: null,
      body: null,
      gloves: null,
      boots: null,
    };
    this.isAlive = true;
  }

  useItem(item) {
    try {
      this.inventory.decreaseItemQuantity(item);
      // TODO: add logic for using items
    } catch (e) {
      console.error(e);
    }

    return this;
  }

  equipItem(item) {
    let { bodyPart, statType } = item;

    let currentItem = this.equipedItems[bodyPart] ?? { stat: 0 };

    if (statType == "physical") {
      this.basePhysicalAttack -= currentItem.stat;
      this.basePhysicalAttack += item.stat;
    } else if (statType == "magical") {
      this.baseMagicPower -= currentItem.stat;
      this.baseMagicPower += item.stat;
    } else if (statType == "deffence") {
      this.baseDeffence -= currentItem.stat;
      this.baseDeffence += item.stat;
    } else {
      throw new Error("This can't be equipped!");
    }

    this.equipedItems[bodyPart] = item;
  }

  unequipItem(item) {
    let { bodyPart, statType } = item;

    let currentItem = this.equipedItems[bodyPart] ?? { stat: 0 };

    if (statType == "physical") {
      this.basePhysicalAttack -= currentItem.stat;
    } else if (statType == "magical") {
      this.baseMagicPower -= currentItem.stat;
    } else if (statType == "deffence") {
      this.baseDeffence -= currentItem.stat;
    } else {
      throw new Error("This can't be equipped!");
    }

    this.equipedItems[bodyPart] = null;
  }

  removeItem(item) {
    this.inventory.dropItem(item);
  }

  useWeapon(target) {
    console.log(`${this.name} attacks ${target.name}!`);

    // TODO: add logic for eventual item use (like potion) that increases attack
    target.takeDamage(this.basePhysicalAttack);
    return this;
  }

  castSkill(skill, target) {
    if (!this.skills.find((s) => s.name == skill.name)) {
      throw new Error("You don't know this skill!");
    }

    if (this.mana < skill.manaCost) {
      throw new Error(
        `Not enough mana!\n 
        You have ${this.mana}, but need ${skill.manaCost} to use ${skill.name}`
      );
    }

    // TODO: change logic so skill that boosts attack/deffence can be used
    this.mana -= skill.manaCost;
    let statToIncrease;
    if (skill.statType == "physical") {
      statToIncrease = basePhysicalAttack;
    } else {
      statToIncrease = baseMagicPower;
    }

    this[statToIncrease] += skill.stat;
    // TODO: add logic for eventual item use (like potion) that increases attack
    target.takeDamage(this[statToIncrease]);
    this[statToIncrease] -= skill.stat;
  }

  takeDamage(damage) {
    const damageDone = damage - this.baseDeffence;
    if (damageDone <= 0) {
      console.log("This attack was unnefective!");
      console.log(`Your power: ${damage}/ Foe's deffence ${this.baseDeffence}.`);
      return;
    }

    this.health -= damageDone;
    console.log(`${damageDone} damage was done!`);
    console.log(`${this.health} health left.`);

    if (this.health <= 0) {
      this._die();
    }
  }

  _die() {
    this.isAlive = false;
    console.log("This character has died!");
  }
}