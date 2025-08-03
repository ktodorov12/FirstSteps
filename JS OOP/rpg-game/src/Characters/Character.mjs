/*
===== STAT TYPES =====
  - physicalDamage
  - magicPower
  - defense
  - health
  - mana

===== STATUS EFFECT =====
  - null (no effect)
  - with certain time (e.g. skills, potions, etc.)
*/
import chalk from "chalk";

export default class Character {
  constructor(
    name,
    health,
    mana,
    physicalDamage,
    magicPower,
    defense,
    inventory,
    skills
  ) {
    this.name = name;
    this._baseHealth = health;
    this._baseMana = mana;
    this.health = health;
    this.mana = mana;
    this.physicalDamage = physicalDamage;
    this.magicPower = magicPower;
    this.defense = defense;
    this.inventory = inventory;
    this.skills = skills;
    this.equippedItems = {
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

  async removeItem(item) {
    try {
      const wasDeleted = await this.inventory.dropItem(item);

      if (wasDeleted && this.equippedItems[item.bodyPart] === item) {
        this.unequipItem(item);
        this.showStatus();
      }

      this.inventory.showInventory();
    } catch (error) {
      console.log(error);
    } finally {
      return this;
    }
  }

  useItem(item) {
    try {
      if (item.bodyPart !== null) {
        throw new Error("You can't use equipable items!");
      }

      this.inventory.decreaseItemQuantity(item);

      if (item.type.endsWith("Potion")) {
        const base = `_base${item.statType[0].toUpperCase() + item.statType.slice(1)}`;

        this[item.statType] = Math.min(this[base], this[item.statType] + item.stat);
      } else {
        this[item.statType] += item.stat;
      }

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
    } catch (error) {
      console.error(error);
    }

    return this;
  }

  equipItem(item) {
    const { bodyPart } = item;

    if (item.bodyPart === null) {
      throw new Error("You can't equip usable items!");
    }

    const currentItem = this.equippedItems[bodyPart];

    this[item.statType] -= currentItem.stat;
    this[item.statType] += item.stat;

    this.equippedItems[bodyPart] = item;
  }

  unequipItem(item) {
    const { bodyPart } = item;

    if (item.bodyPart === null) {
      throw new Error("You can't equip usable items!");
    }

    const currentItem = this.equippedItems[bodyPart];

    this[item.statType] -= currentItem.stat;

    this.equippedItems[bodyPart] = { stat: 0 };
  }

  useWeapon(target) {
    console.log(`${this.name} attacks ${target.name}!`);

    target.takeDamage(this.physicalDamage);
    return this;
  }

  learnSkill(skill) {
    try {
      this.skills.learnSkill(skill);
    } catch (error) {
      console.log(error);
    }
  }

  forgetSkill(skill) {
    try {
      this.skills.forgetSkill(skill);
    } catch (error) {
      console.log(error);
    }
  }

  castSkill(skill, target) {
    try {
      this.skills.knowsSkill(skill);

      if (this.mana < skill.manaCost) {
        throw new Error(
          `Not enough mana!\n 
          You have ${this.mana}, but need ${skill.manaCost} to use ${skill.name}`
        );
      }

      this[skill.statType] += skill.stat;

      if (target === this) {
        console.log(`You used ${skill.name}.`);
        console.log(`Your ${skill.statType} went up to ${this[skill.statType]}`);
      } else {
        const validStats = ["physicalDamage", "magicPower"];
        if (!validStats.includes(skill.statType))
          throw new Error("Invalid target! Cannot use this skill against enemies");

        console.log(`${this.name} uses ${skill} against ${target.name}`);
        target.takeDamage(this[skill.statType]);
      }

      this.mana -= skill.manaCost;
      console.log(`Your mana was decreased to ${this.mana}`);

      // TODO: add logic for damage effect of skills (e.g. burn, poison, etc.)
      if (skill.statusEffectLength) {
        setTimeout(() => {
          this[skill.statType] -= skill.stat;
          console.log(
            `${skill.name}'s effect wore off. Your ${skill.statType} is now ${
              this[skill.statType]
            }`
          );
        }, skill.statusEffectLength * 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  takeDamage(damage) {
    const damageDone = damage - this.defense;
    if (damageDone <= 0) {
      console.log("This attack was unnefective!");
      console.log(`Your power: ${damage}/ Foe's defense ${this.defense}.`);
      return;
    }

    this.health -= damageDone;
    console.log(`${damageDone} damage was done!`);
    console.log(`${this.health} health left.`);

    if (this.health <= 0) {
      this._die();
    }
  }

  showStatus() {
    console.log(chalk.yellow.bold("\n❤️ === CURRENT STATUS ==="));
    console.log(`🩸 Health: ${chalk.red(this.health)}`);
    console.log(`🔵 Mana: ${chalk.blue(this.mana)}`);
    console.log(`⚔️  Physical Damage: ${chalk.green(this.physicalDamage)}`);
    console.log(`✨ Magic Power: ${chalk.magenta(this.magicPower)}`);
    console.log(`🛡️  Defense: ${chalk.cyan(this.defense)}`);

    console.log(chalk.yellow.bold("\n🧰 === EQUIPPED ITEMS ==="));
    Object.entries(this.equippedItems).forEach(([slot, item]) => {
      if (item && item.name) {
        console.log(
          `${slot}: ${chalk.green(item.name)} (+${item.stat} ${item.statType})`
        );
      } else {
        console.log(`${slot}: ${chalk.gray("None")}`);
      }
    });

    console.log(`${chalk.yellow("=".repeat(30))} \n`);
  }

  _die() {
    this.isAlive = false;
    console.log("This character has died!");
  }
}
