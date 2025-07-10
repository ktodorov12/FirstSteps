import { readFile } from "fs/promises";

import Character from "../Characters/Character.mjs";

import Inventory from "../Items/Inventory.mjs";
import Item from "../Items/Item.mjs";

import Skill from "../Skills/Skill.mjs";
import Skills from "../Skills/Skills.mjs";

export default async function createCharacter(character) {
  try {
    const data = await readFile(`src/data/${character}.json`, "utf8");
    const { characterData, itemsData, skillsData } = JSON.parse(data);

    const characterBaseItems = itemsData.map(buildItem);

    const characterBaseSkills = skillsData.map(buildSkill);

    const inventory = new Inventory();
    const skills = new Skills();

    characterBaseItems.forEach((item) => inventory.addItem(item));
    characterBaseSkills.forEach((skill) => skills.learnSkill(skill));

    const newCharacter = new Character(
      characterData.name,
      characterData.health,
      characterData.mana,
      characterData.basePhysicalAttack,
      characterData.baseMagicPower,
      characterData.baseDeffence,
      inventory,
      skills
    );

    characterBaseItems.forEach((item) => newCharacter.equipItem(item));

    return newCharacter;
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

function buildItem(item) {
  return new Item(item.type, item.name, item.stat, item.statType, item.bodyPart, item.rarity);
}

function buildSkill(skill) {
  return new Skill(skill.name, skill.manaCost, skill.stat, skill.statType);
}

