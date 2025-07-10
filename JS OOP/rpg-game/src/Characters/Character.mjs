/*
===== STAT TYPES =====
  - physicalDammage
  - magicPower
  - deffence
  - health
  - mana

===== STATUS EFFECT =====
  - null (no effect)
  - with certain time (e.g. skills, potions, etc.)
*/

export default class Character {
  constructor(
    name,
    health,
    mana,
    physicalDammage,
    magicPower,
    deffence,
    inventory,
    skills
  ) {
    this.name = name;
    this.health = health;
    this.mana = mana;
    this.physicalDammage = physicalDammage;
    this.magicPower = magicPower;
    this.deffence = deffence;
    this.inventory = inventory;
    this.skills = skills;
    this.equipedItems = {
      leftHand: { stat: 0 },
      rightHand: { stat: 0 },
      head: { stat: 0 },
      body: { stat: 0 },
      gloves: { stat: 0 },
      boots: { stat: 0 },
    };
    this.isAlive = true;
  }

  pickUpItem(item) {
    this.inventory.addItem(item);

    return this;
  }

  removeItem(item) {
    try {
      this.inventory.dropItem(item);
    } catch (error) {
      console.log(error);
    } finally {
      return this;
    }
  }

  useItem(item) {
    try {
      this.inventory.decreaseItemQuantity(item);

      this[item.statType] += item.stat;
      console.log(`You used ${item.name}.`);
      console.log(`Your ${item.statType} went up to ${this[item.statType]}`);

      if (item.statusEffectLength) {
        setTimeout(() => {
          this[item.statType] -= item.stat;
          console.log(
            `${item.name}'s effect wore off. Your ${item.statType} is now ${
              this[item.statType]
            }`
          );
        }, item.statusEffectLength * 1000);
      }
    } catch (e) {
      console.error(e);
    }

    return this;
  }

  equipItem(item) {
    const { bodyPart } = item;

    const currentItem = this.equipedItems[bodyPart];

    this[item.statType] -= currentItem.stat;
    this[item.statType] += item.stat;

    this.equipedItems[bodyPart] = item;
  }

  unequipItem(item) {
    const { bodyPart } = item;

    const currentItem = this.equipedItems[bodyPart];

    this[item.statType] -= currentItem.stat;

    this.equipedItems[bodyPart] = { stat: 0 };
  }

  useWeapon(target) {
    console.log(`${this.name} attacks ${target.name}!`);

    target.takeDamage(this.physicalDammage);
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
    if (skill.statType == "physicalDammage") {
      statToIncrease = "physicalDammage";
    } else {
      statToIncrease = "magicPower";
    }

    this[statToIncrease] += skill.stat;
    // TODO: add logic for eventual item use (like potion) that increases attack
    target.takeDamage(this[statToIncrease]);
    this[statToIncrease] -= skill.stat;
  }

  takeDamage(damage) {
    const damageDone = damage - this.deffence;
    if (damageDone <= 0) {
      console.log("This attack was unnefective!");
      console.log(`Your power: ${damage}/ Foe's deffence ${this.deffence}.`);
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
