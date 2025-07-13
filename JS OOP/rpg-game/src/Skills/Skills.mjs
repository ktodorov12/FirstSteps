import chalk from "chalk";

export default class Skills {
  constructor() {
    this.skills = {};
  }

  learnSkill(skill) {
    if (this.skills[skill.name]) {
      throw new Error("You already know this skill!");
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

  knowsSkill(skill) {
    if (!this.skills[skill.name]) {
      throw new Error(`${skill.name} you don't know that skill!`);
    }
  }

  showSkills() {
    console.log(chalk.magenta.bold("\n📜 === YOUR SKILLS ==="));

    if (Object.keys(this.skills).length === 0) {
      console.log(chalk.gray("You have not learned any skills yet."));
    } else {
      for (let skillName in this.skills) {
        const skill = this.skills[skillName];
        console.log(
          `✨ ${chalk.magenta(skill.name)} - Cost: ${chalk.blue(skill.manaCost)} mana, ` +
            `Power: +${skill.stat} ${skill.statType}`
        );
      }
    }

    console.log(`${chalk.magenta("=".repeat(30))} \n`);
  }
}
