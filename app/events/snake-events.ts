import {Event} from "../core/event.js";
import {SnakeDirection} from "../models/snake.js";

const snakeEventsDomain = 'snake';

export class SnakeMoveEvent extends Event {
    private readonly _snakeDirection: SnakeDirection;

    constructor(direction?: SnakeDirection) {
        super('move', snakeEventsDomain);

        this._snakeDirection = direction ?? 'up';
    }

    override getPayload(): SnakeDirection {
        return this._snakeDirection;
    }
}

export class SnakeMoveForwardEvent extends Event {
    constructor() {
        super('moveForward', snakeEventsDomain);
    }
}
