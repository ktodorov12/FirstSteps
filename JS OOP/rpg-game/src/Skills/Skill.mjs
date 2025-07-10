export default class Skill {
  constructor(name, manaCost, stat, statType, statusEffectLength = 0) {
    this.name = name;
    this.manaCost = manaCost;
    this.stat = stat;
    this.statType = statType;
    this.statusEffectLength = statusEffectLength;
  }
}
