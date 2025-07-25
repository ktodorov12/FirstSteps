import generateRandomRarities from "../util/generateRandomRarities.mjs";
import createCharacter from "./createCharacter.mjs";

const possibleEnemies = {
  common: "undead",
  uncommon: "goblin",
  rare: "ork",
};

export default async function createEnemies(mapSize) {
  const randomizedRarities = generateRandomRarities(mapSize);
  const enemies = [];

  for (let rarity of randomizedRarities) {
    const enemy = await createCharacter(possibleEnemies[rarity]);
    enemies.push(enemy);
  }

  const boss = await createCharacter("boss");
  enemies.push(boss);

  return enemies;
}