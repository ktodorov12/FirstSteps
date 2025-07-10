import createCharacter from "./services/createCharacter.mjs";

const knight = await createCharacter("knight");
const mage = await createCharacter("mage");

const undead = await createCharacter("undead");
const goblin = await createCharacter("goblin");
const ork = await createCharacter("ork");

console.log(ork);
