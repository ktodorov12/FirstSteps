export function generateEnemyName(enemyType) {
    const undeadPrefixes = ['Necro', 'Ghoul', 'Wraith', 'Shade', 'Blight', 'Crypt'];
    const undeadRoots = ['skull', 'bone', 'shade', 'wight', 'reaver', 'specter'];
    const undeadSuffixes = ['fang', 'claw', 'rend', 'doom', 'grasp'];

    const goblinPrefixes = ['Sneak', 'Grim', 'Snot', 'Muck', 'Gloom', 'Scrag'];
    const goblinRoots = ['gob', 'snout', 'tusk', 'claw', 'fang', 'maw'];
    const goblinSuffixes = ['ling', 'er', 'kin', 'bite', 'slash'];

    const orkPrefixes = ['Blood', 'Iron', 'War', 'Grunt', 'Skull', 'Rage'];
    const orkRoots = ['axe', 'maul', 'fang', 'tusk', 'crusher', 'rend'];
    const orkSuffixes = ['or', 'ok', 'ar', 'smash', 'bash'];

    const bossPrefixes = ['Dark', 'Vile', 'Dread', 'Grim', 'Void', 'Chaos'];
    const bossRoots = ['lord', 'king', 'reaver', 'bane', 'tyrant', 'overlord'];
    const bossSuffixes = ['wrath', 'doom', 'scourge', 'rend', 'blight'];

    let prefixes, roots, suffixes;
    switch (enemyType.toLowerCase()) {
        case 'undead':
            prefixes = undeadPrefixes;
            roots = undeadRoots;
            suffixes = undeadSuffixes;
            break;
        case 'goblin':
            prefixes = goblinPrefixes;
            roots = goblinRoots;
            suffixes = goblinSuffixes;
            break;
        case 'ork':
            prefixes = orkPrefixes;
            roots = orkRoots;
            suffixes = orkSuffixes;
            break;
        case 'boss':
            prefixes = bossPrefixes;
            roots = bossRoots;
            suffixes = bossSuffixes;
            break;
        default:
            prefixes = [...undeadPrefixes, ...goblinPrefixes, ...orkPrefixes, ...bossPrefixes];
            roots = [...undeadRoots, ...goblinRoots, ...orkRoots, ...bossRoots];
            suffixes = [...undeadSuffixes, ...goblinSuffixes, ...orkSuffixes, ...bossSuffixes];
    }

    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomRoot = roots[Math.floor(Math.random() * roots.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

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