export default function generateRandomRarities(size) {
  const totalWeight = size * 75;
  const k = 2;
  const scalingFactor = 1 / Math.log(size + k);

  const rarities = [
    { name: "common", weight: totalWeight * 0.15 * scalingFactor },
    { name: "uncommon", weight: totalWeight * 0.25 * scalingFactor },
    { name: "rare", weight: totalWeight * 0.6 * scalingFactor },
  ];

  let remainingWeight = totalWeight;
  const randomizedRarities = [];

  while (randomizedRarities.length < size + 2 && remainingWeight > 0) {
    const selected = rarities[Math.floor(Math.random() * rarities.length)];

    randomizedRarities.push(selected.name);
    remainingWeight -= selected.weight;
  }

  return randomizedRarities;
}
