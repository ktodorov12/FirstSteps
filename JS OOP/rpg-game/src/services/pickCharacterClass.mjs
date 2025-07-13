import pkg from 'enquirer';
import chalk from 'chalk';

export default async function pickCharacterClass() {
  console.log(chalk.redBright(`
⚔️  KNIGHT
       !
      .-.
    __|=|__
   (_/ - \\_)
   //\\___/\\\\
   <>/   \\<>
    \\|_._|/
     <_I_>
      |||
     /_|_\\
`));

  console.log(chalk.blueBright(`
🔮  MAGE
     __/\\__
 . _ \\\\'//
-( )-/_||_\\
 .'. \\_()_/
  | _ | . \\
  |   | .  \\
 .'. \\_____'.
`));

  const { Select } = pkg;
  const answer = await new Select({
    name: 'character',
    message: 'Pick your character class:',
    choices: [
        { name: 'knight', message: '⚔️ Knight', value: 'knight' },
        { name: 'mage', message: '🔮 Mage', value: 'mage' }
    ]
  }).run();

  console.log(`✅ You selected: ${answer}`);
  return answer;
}
