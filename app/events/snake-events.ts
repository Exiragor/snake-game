import {Event} from "@core";
import {SnakeDirection} from "@models";

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

export class SnakeBreakEvent extends Event {
    constructor() {
        super('break', snakeEventsDomain);
    }
}
