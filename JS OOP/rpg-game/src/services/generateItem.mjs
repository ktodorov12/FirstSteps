import Item from "../Items/Item.mjs";

import { generateItemName } from "../util/generateRandomName.mjs";
import getRandomNumber from "../util/getRandomNumber.mjs";

const possibleRarities = {
  common: 5,
  uncommon: 10,
  rare: 15,
  epic: 20,
  legendary: 25,
};

const pickType = (possibleTypes) => possibleTypes[getRandomNumber(possibleTypes.length)];
const typesData = [
  {
    statType: "physicalDamage",
    type: pickType(["axe", "sword", "hammer", "dagger"]),
  },
  {
    statType: "magicPower",
    type: pickType(["staff", "wand"]),
  },
  {
    statType: "defense",
    type: pickType(["shield", "armour"]),
  },
  {
    statType: "health",
    type: pickType(["healthPotion"]),
  },
  {
    statType: "mana",
    type: pickType(["manaPotion"]),
  },
];

export default function generateItem(rarity) {
  const { statType, type } = typesData[getRandomNumber(typesData.length)];

  const stat = 2 * getRandomNumber(possibleRarities[rarity]);

  let bodyPart;
  switch (statType) {
    case "physicalDamage":
    case "magicPower":
      bodyPart = "rightHand";
      break;
    case "defense":
      const bodyParts = ["head", "body", "gloves", "boots"];
      bodyPart =
        type == "shield" ? "leftHand" : bodyParts[getRandomNumber(bodyParts.length)];
      break;
    default:
      null;
  }

  const name = generateItemName(type, rarity, bodyPart);

  let statusEffectLength;
  if (statType == "health" || statType == "mana") {
    statusEffectLength = getRandomNumber(11);
  } else statusEffectLength = null;

  return new Item(type, name, stat, statType, bodyPart, rarity, statusEffectLength);
}
