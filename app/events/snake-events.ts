import {Event} from "../core/event.js";
import {SnakeDirection} from "../models/snake.js";

const snakeEventsDomain = 'snake';

export class SnakeChangeDirectionEvent extends Event {
    private readonly _snakeDirection: SnakeDirection;

    constructor(direction?: SnakeDirection) {
        super('changeDirection', snakeEventsDomain);

        this._snakeDirection = direction ?? 'up';
    }

    override getPayload(): SnakeDirection {
        return this._snakeDirection;
    }
}

export class SnakeMoveEvent extends Event {
    constructor() {
        super('move', snakeEventsDomain);
    }
}
