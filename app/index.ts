import {SnakeGame} from './game/snake-game.js';

const game = new SnakeGame();
game.init().catch(console.error);