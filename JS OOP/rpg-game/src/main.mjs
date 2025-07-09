import Character from "./Characters/Character.mjs";

import Inventory from "./Items/Inventory.mjs";
import Item from "./Items/Item.mjs";

import Skill from "./Skills/Skill.mjs";
import Skills from "./Skills/Skills.mjs";

// TODO: make this as util function that returns JSON and parse it after in the class;
const sword = new Item("sword", "Rusty Sword", 10, "physical", "rightHand", "common");
const shield = new Item("shield", "Wooden Shield", 10, "deffence", "leftHand", "common");

const head = new Item("armour", "Cap", 5, "deffence", "head", "common");
const bodyArmour = new Item("armour", "Vest", 10, "deffence", "body", "common");
const gloves = new Item("armour", "Mitts", 2, "deffence", "gloves", "common");
const boots = new Item("armour", "Leather Shoes", 3, "deffence", "boots", "common");

const knightItems = [sword, shield, head, bodyArmour, gloves, boots];
const inventory = new Inventory();
knightItems.forEach((item) => inventory.addItem(item));

const swordSlash = new Skill("Sword Slash", 20, 30, "physical");
const shieldCharge = new Skill("Shield Charge", 10, 10, "physical");

const knightSkills = [swordSlash, shieldCharge];
const skills = new Skills();
knightSkills.forEach((skill) => skills.learnSkill(skill));

class Knight extends Character {
  constructor(name) {
    super(name, 200, 100, 100, 50, 100, inventory, skills);

    knightItems.forEach((item) => this.equipItem(item));
  }
}
// =================================================================

const knight = new Knight("Pesho");
console.log(knight);

knight.unequipItem(sword);
console.log("==================================================================");
console.log(knight);
