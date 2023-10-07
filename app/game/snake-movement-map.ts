import {SnakeChangeDirectionEvent} from "@events";

export const snakeMovementMap = {
    'ArrowUp': new SnakeChangeDirectionEvent('up'),
    'ArrowDown': new SnakeChangeDirectionEvent('down'),
    'ArrowLeft': new SnakeChangeDirectionEvent('left'),
    'ArrowRight': new SnakeChangeDirectionEvent('right'),
}