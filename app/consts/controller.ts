import {SnakeMoveEvent} from "../events/snake-events.js";

export const defaultClickOpts = {ctrl: false, alt: false, shift: false};
export const keyDownEvent = 'keydown';

export const snakeMovementMap = {
    'ArrowUp': new SnakeMoveEvent('up'),
    'ArrowDown': new SnakeMoveEvent('down'),
    'ArrowLeft': new SnakeMoveEvent('left'),
    'ArrowRight': new SnakeMoveEvent('right'),
}