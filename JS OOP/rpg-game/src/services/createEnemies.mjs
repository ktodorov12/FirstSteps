import { generateEnemyName } from "../util/generateRandomName.mjs";
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
    const enemyRarity = possibleEnemies[rarity];

    const enemyName = generateEnemyName(possibleEnemies[rarity])
    const enemy = await createCharacter(enemyRarity, enemyName);
    
    enemies.push(enemy);
  }

  const boss = await createCharacter("boss", generateEnemyName("boss"));
  enemies.push(boss);

  return enemies;
}