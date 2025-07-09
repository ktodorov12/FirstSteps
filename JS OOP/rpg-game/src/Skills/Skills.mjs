export default class Skills {
  constructor() {
    this.skills = {};
  }

  learnSkill(skill) {
    if (this.skills[skill.name]) {
      throw new Error("You alredy know this skill!");
    }

    this.skills[skill.name] = skill;

    return this;
  }

  forgetSkill(skill) {
    if (!this.skills[skill.name]) {
      throw new Error(`${skill.name} you don't know that skill!`);
    }

    delete this.skills[skill.name];
  }
}