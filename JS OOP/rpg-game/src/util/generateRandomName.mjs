import getRandomNumber from "./getRandomNumber.mjs";

export function generateEnemyName(enemyType) {
  const undeadPrefixes = ["Necro", "Ghoul", "Wraith", "Shade", "Blight", "Crypt"];
  const undeadRoots = ["skull", "bone", "shade", "wight", "reaver", "specter"];
  const undeadSuffixes = ["fang", "claw", "rend", "doom", "grasp"];

  const goblinPrefixes = ["Sneak", "Grim", "Snot", "Muck", "Gloom", "Scrag"];
  const goblinRoots = ["gob", "snout", "tusk", "claw", "fang", "maw"];
  const goblinSuffixes = ["ling", "er", "kin", "bite", "slash"];

  const orkPrefixes = ["Blood", "Iron", "War", "Grunt", "Skull", "Rage"];
  const orkRoots = ["axe", "maul", "fang", "tusk", "crusher", "rend"];
  const orkSuffixes = ["or", "ok", "ar", "smash", "bash"];

  const bossPrefixes = ["Dark", "Vile", "Dread", "Grim", "Void", "Chaos"];
  const bossRoots = ["lord", "king", "reaver", "bane", "tyrant", "overlord"];
  const bossSuffixes = ["wrath", "doom", "scourge", "rend", "blight"];

  let prefixes, roots, suffixes;
  switch (enemyType.toLowerCase()) {
    case "undead":
      prefixes = undeadPrefixes;
      roots = undeadRoots;
      suffixes = undeadSuffixes;
      break;
    case "goblin":
      prefixes = goblinPrefixes;
      roots = goblinRoots;
      suffixes = goblinSuffixes;
      break;
    case "ork":
      prefixes = orkPrefixes;
      roots = orkRoots;
      suffixes = orkSuffixes;
      break;
    case "boss":
      prefixes = bossPrefixes;
      roots = bossRoots;
      suffixes = bossSuffixes;
      break;
    default:
      prefixes = [...undeadPrefixes, ...goblinPrefixes, ...orkPrefixes, ...bossPrefixes];
      roots = [...undeadRoots, ...goblinRoots, ...orkRoots, ...bossRoots];
      suffixes = [...undeadSuffixes, ...goblinSuffixes, ...orkSuffixes, ...bossSuffixes];
  }

  const randomPrefix = prefixes[getRandomNumber(prefixes.length)];
  const randomRoot = roots[getRandomNumber(roots.length)];
  const randomSuffix = suffixes[getRandomNumber(suffixes.length)];

  // Randomly choose name structure: Prefix+Root, Root+Suffix, or Prefix+Root+Suffix
  const structure = Math.random();
  let name;
  if (structure < 0.33) {
    name = `${randomPrefix}${randomRoot}`;
  } else if (structure < 0.66) {
    name = `${randomRoot}${randomSuffix}`;
  } else {
    name = `${randomPrefix}${randomRoot}${randomSuffix}`;
  }

  return name[0].toUpperCase() + name.substring(1);
}

export function generateSpellName(statType) {
  const physicalDamagePrefixes = ["Force", "Rage", "Blitz", "Iron", "Crush", "Strike"];
  const physicalDamageRoots = ["slash", "smash", "rend", "cut", "bash", "thrust"];
  const physicalDamageSuffixes = ["fury", "blow", "storm", "edge", "crash"];

  const magicPowerPrefixes = ["Arc", "Mystic", "Aether", "Void", "Star", "Rune"];
  const magicPowerRoots = ["bolt", "surge", "pulse", "wave", "flare", "beam"];
  const magicPowerSuffixes = ["ara", "ion", "eth", "or", "yx"];

  const defensePrefixes = ["Iron", "Stone", "Ward", "Fort", "Shield", "Bulwark"];
  const defenseRoots = ["wall", "guard", "shell", "bastion", "barrier", "aegis"];
  const defenseSuffixes = ["hold", "stand", "forge", "veil", "lock"];

  const healthPrefixes = ["Vita", "Life", "Bloom", "Mend", "Heal", "Renew"];
  const healthRoots = ["pulse", "flow", "tide", "spark", "breath", "vigor"];
  const healthSuffixes = ["ance", "en", "ia", "ism", "ora"];

  const manaPrefixes = ["Astral", "Ether", "Mana", "Spirit", "Glimmer", "Flux"];
  const manaRoots = ["weave", "surge", "current", "stream", "link", "font"];
  const manaSuffixes = ["ic", "en", "ara", "or", "ith"];

  let prefixes, roots, suffixes;
  switch (statType.toLowerCase()) {
    case "physicaldamage":
      prefixes = physicalDamagePrefixes;
      roots = physicalDamageRoots;
      suffixes = physicalDamageSuffixes;
      break;
    case "magicpower":
      prefixes = magicPowerPrefixes;
      roots = magicPowerRoots;
      suffixes = magicPowerSuffixes;
      break;
    case "defense":
      prefixes = defensePrefixes;
      roots = defenseRoots;
      suffixes = defenseSuffixes;
      break;
    case "health":
      prefixes = healthPrefixes;
      roots = healthRoots;
      suffixes = healthSuffixes;
      break;
    case "mana":
      prefixes = manaPrefixes;
      roots = manaRoots;
      suffixes = manaSuffixes;
      break;
    default:
      prefixes = [
        ...physicalDamagePrefixes,
        ...magicPowerPrefixes,
        ...defensePrefixes,
        ...healthPrefixes,
        ...manaPrefixes,
      ];
      roots = [
        ...physicalDamageRoots,
        ...magicPowerRoots,
        ...defenseRoots,
        ...healthRoots,
        ...manaRoots,
      ];
      suffixes = [
        ...physicalDamageSuffixes,
        ...magicPowerSuffixes,
        ...defenseSuffixes,
        ...healthSuffixes,
        ...manaSuffixes,
      ];
  }

  const randomPrefix = prefixes[getRandomNumber(prefixes.length)];
  const randomRoot = roots[getRandomNumber(roots.length)];
  const randomSuffix = suffixes[getRandomNumber(suffixes.length)];

  return `${randomPrefix}${randomRoot}${randomSuffix}`;
}

export function generateItemName(itemType, rarity, armorBodyPart = null) {
    // Base components for different item types
    const weaponPrefixes = ['Blood', 'Iron', 'Shadow', 'Frost', 'Storm', 'Rage'];
    const weaponRoots = {
        axe: ['axe', 'cleaver', 'hewer'],
        sword: ['blade', 'sabre', 'edge'],
        hammer: ['maul', 'crusher', 'sledge'],
        dagger: ['knife', 'shank', 'stiletto']
    };
    const weaponSuffixes = ['fury', 'bane', 'rend', 'strike'];

    const magicPrefixes = ['Arc', 'Star', 'Mystic', 'Void', 'Aether', 'Rune'];
    const magicRoots = {
        staff: ['staff', 'rod', 'spire'],
        wand: ['wand', 'sceptre', 'twig']
    };
    const magicSuffixes = ['ara', 'eth', 'ion', 'or'];

    const defensePrefixes = ['Iron', 'Stone', 'Ward', 'Fort', 'Steel', 'Oath'];
    const defenseRoots = {
        shield: ['shield', 'buckler', 'aegis'],
        armour: {
            head: ['helm', 'crown', 'visor'],
            body: ['plate', 'vest', 'cuirass'],
            gloves: ['gauntlet', 'grip', 'mitt'],
            boots: ['greaves', 'treads', 'sabaton']
        }
    };
    const defenseSuffixes = ['guard', 'hold', 'wall', 'forge'];

    const potionPrefixes = ['Vita', 'Ether', 'Glimmer', 'Pure', 'Holy', 'Dawn'];
    const potionRoots = {
        healthpotion: ['elixir', 'draught', 'tonic'],
        manapotion: ['essence', 'phial', 'brew']
    };
    const potionSuffixes = ['vigor', 'spark', 'flow', 'mist'];

    // Rarity modifiers for extra flair
    const rarityPrefixes = {
        common: [""],
        uncommon: ['Fine', 'Stout', 'Keen'],
        rare: ['Gleaming', 'Dire', 'Bold'],
        epic: ['Ancient', 'Sacred', 'Fell'],
        legendary: ['Mythic', 'Eternal', 'Divine']
    };
    const raritySuffixes = {
        common: [""],
        uncommon: [' of Power', ' of Grit'],
        rare: [' of Glory', ' of Doom'],
        epic: [' of Ages', ' of Wrath'],
        legendary: [' of Legends', ' of Eternity']
    };

    let prefixes, roots, suffixes;
    const normalizedItemType = itemType.toLowerCase();
    const normalizedRarity = rarity.toLowerCase();

    // Select components based on item type
    switch (normalizedItemType) {
        case 'axe':
        case 'sword':
        case 'hammer':
        case 'dagger':
            prefixes = [...weaponPrefixes, ...rarityPrefixes[normalizedRarity]];
            roots = weaponRoots[normalizedItemType];
            suffixes = [...weaponSuffixes, ...raritySuffixes[normalizedRarity]];
            break;
        case 'staff':
        case 'wand':
            prefixes = [...magicPrefixes, ...rarityPrefixes[normalizedRarity]];
            roots = magicRoots[normalizedItemType];
            suffixes = [...magicSuffixes, ...raritySuffixes[normalizedRarity]];
            break;
        case 'shield':
            prefixes = [...defensePrefixes, ...rarityPrefixes[normalizedRarity]];
            roots = defenseRoots.shield;
            suffixes = [...defenseSuffixes, ...raritySuffixes[normalizedRarity]];
            break;
        case 'armour':
            if (!armorBodyPart) throw new Error('armorBodyPart required for armour item type');
            prefixes = [...defensePrefixes, ...rarityPrefixes[normalizedRarity]];
            roots = defenseRoots.armour[armorBodyPart.toLowerCase()];
            suffixes = [...defenseSuffixes, ...raritySuffixes[normalizedRarity]];
            break;
        case 'healthpotion':
        case 'manapotion':
            prefixes = [...potionPrefixes, ...rarityPrefixes[normalizedRarity]];
            roots = potionRoots[normalizedItemType];
            suffixes = [...potionSuffixes, ...raritySuffixes[normalizedRarity]];
            break;
        default:
            throw new Error(`Unknown item type: ${itemType}`);
    }

    // Randomly select components
    const randomPrefix = prefixes[getRandomNumber(prefixes.length)];
    const randomRoot = roots[getRandomNumber(roots.length) || 0];
    const randomSuffix = suffixes[getRandomNumber(suffixes.length)];

    // Build name based on rarity and random structure
    const structure = Math.random();
    if (normalizedRarity === 'legendary' || structure < 0.4) {
        return `${randomPrefix}${randomRoot}${randomSuffix}`;
    } else if (structure < 0.7) {
        return `${randomPrefix}${randomRoot}`;
    } else {
        return `${randomRoot}${randomSuffix}`;
    }
}