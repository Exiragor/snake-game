import {SnakeChangeDirectionEvent} from "../events/snake-events.js";

export const defaultClickOpts = {ctrl: false, alt: false, shift: false};
export const keyDownEvent = 'keydown';

export const snakeMovementMap = {
    'ArrowUp': new SnakeChangeDirectionEvent('up'),
    'ArrowDown': new SnakeChangeDirectionEvent('down'),
    'ArrowLeft': new SnakeChangeDirectionEvent('left'),
    'ArrowRight': new SnakeChangeDirectionEvent('right'),
}