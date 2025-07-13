import Game from './Game/Game.mjs';

async function main() {
  const game = new Game();
  await game.initialize();
}

main();