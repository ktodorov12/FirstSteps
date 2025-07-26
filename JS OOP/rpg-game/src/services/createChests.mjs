import generateRandomRarities from "../util/generateRandomRarities.mjs";

import generateItem from "./generateItem.mjs";
import generateSkill from "./generateSkill.mjs";

export default function createChests(mapSize) {
  const randomizedRarities = generateRandomRarities(mapSize);
  const chests = [];

  for (let rarity of randomizedRarities) {
    const chestContent = Math.random() < 0.4 ? generateSkill() : generateItem(rarity);
    chests.push(chestContent);
  }

  return chests;
}