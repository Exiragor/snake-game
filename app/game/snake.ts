import {Cord, EventsBus} from "@core";
import {SnakeDirection} from "@models";
import {SnakeBreakEvent, SnakeMoveEvent} from "@events";
import {SnakeUtils} from "../utils";

export class Snake {
    private _prevCords: Cord[] = [];
    private _currentDirection: SnakeDirection = 'up';
    private _length: number = 0;
    private _speedInterval: number | null = null;
    private _eventBus: EventsBus;

    head!: Cord;
    tail!: Cord;
    body!: Cord[];

    constructor(cords: Cord[], eventBus: EventsBus) {
        SnakeUtils.validateCords(cords);

        this.makeSnake(cords);
        this._eventBus = eventBus ?? new EventsBus();
    }

    toArray(): Cord[] {
        return [this.head, ...this.body, this.tail];
    }

    get prevCords(): Cord[] {
        return this._prevCords;
    }

    changeDirection(direction: SnakeDirection) {
        if (SnakeUtils.checkOppositeDirection(this._currentDirection, direction)) {
            return;
        }
        this._currentDirection = direction;
    }

    moveForward(speed: number) {
        this._speedInterval = setInterval(() => {
            this.move();
        }, speed);
    }

    stopMoving() {
        if (this._speedInterval) {
            clearInterval(this._speedInterval);
        }
    }

    private move() {
        this._prevCords = this.toArray();
        this.makeSnake(this.getNewCords());

        const isCorrectSnake = SnakeUtils.checkCollisions(this.toArray());
        if (isCorrectSnake) {
            this._eventBus.emit(new SnakeMoveEvent());
        } else {
            this._eventBus.emit(new SnakeBreakEvent());
        }
    }

    private makeSnake(cords: Cord[]) {
        const tplArr = [...cords];
        this.head = tplArr.splice(0, 1)[0];
        this.tail = tplArr.splice(tplArr.length - 1, 1)[0];
        this.body = [...tplArr];
        this._length = this.toArray().length;
    }

    private getNewCords(): Cord[] {
        const withoutTail = this.toArray().slice(0, this._length - 1);

        switch (this._currentDirection) {
            case "up":
                return [new Cord(this.head.x, this.head.y - 1), ...withoutTail];
            case "down":
                return [new Cord(this.head.x, this.head.y + 1), ...withoutTail];
            case "left":
                return [new Cord(this.head.x - 1, this.head.y), ...withoutTail];
            case "right":
                return [new Cord(this.head.x + 1, this.head.y), ...withoutTail];
        }
    }
}