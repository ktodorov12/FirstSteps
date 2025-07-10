export default class Item {
  constructor(type, name, stat, statType, bodyPart, rarity, statusEffectLength = 0) {
    this.type = type;
    this.name = name;
    this.stat = stat;
    this.statType = statType;
    this.bodyPart = bodyPart;
    this.rarity = rarity;
    this.statusEffectLength = statusEffectLength;
  }
}
