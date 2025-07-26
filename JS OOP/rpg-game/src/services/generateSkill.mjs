import Skill from "../Skills/Skill.mjs";

import { generateSpellName } from "../util/generateRandomName.mjs";
import getRandomNumber from "../util/getRandomNumber.mjs";

const typesData = [
  {
    statType: "physicalDamage",
  },
  {
    statType: "magicPower",
  },
  {
    statType: "defense",
  },
  {
    statType: "health",
  },
  {
    statType: "mana",
  },
];

export default function generateSkill() {
  const { statType } = typesData[getRandomNumber(typesData.length)];
  const name = generateSpellName(statType);
  const manaCost = getRandomNumber(51);
  const stat = getRandomNumber(61);
  const statusEffectLength = Math.random() < 0.5 ? 0 : getRandomNumber(11);

  return new Skill(name, manaCost, stat, statType, statusEffectLength);
}
