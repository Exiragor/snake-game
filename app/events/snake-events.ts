import {Event} from "../core/event.js";
import {SnakeDirection} from "../models/snake.js";

const snakeEventsDomain = 'snake';

export class SnakeMoveEvent extends Event {
    private readonly _snakeDirection: SnakeDirection;

    constructor(direction: SnakeDirection) {
        super('move', snakeEventsDomain);

        this._snakeDirection = direction;
    }

    override getPayload(): SnakeDirection {
        return this._snakeDirection;
    }
}
