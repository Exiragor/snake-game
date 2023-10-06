import {Cord} from "./cord.js";
import {SnakeDirection} from "../models/snake.js";

export class Snake {
    private _prevCords: Cord[] = [];
    private _currentDirection: SnakeDirection = 'up';
    private _length: number = 0;

    head!: Cord;
    tail!: Cord;
    body!: Cord[];

    constructor(cords: Cord[]) {
        Snake.validateCords(cords);

        this.makeSnake(cords);
    }

    toArray(): Cord[] {
        return [this.head, ...this.body, this.tail];
    }

    get prevCords(): Cord[] {
        return this._prevCords;
    }

    changeDirection(direction: SnakeDirection) {
        this._currentDirection = direction;
    }

    moveForward() {
        this.move();
    }

    private move(withGrowth = false) {
        this._prevCords = this.toArray();
        this.makeSnake(this.getNewCords());
    }

    private makeSnake(cords: Cord[]) {
        this.head = cords.splice(0, 1)[0];
        this.tail = cords.splice(cords.length - 1, 1)[0];
        this.body = [...cords];
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

    private static validateCords(cords: Cord[]) {
        if (cords.length < 2) {
            throw new Error('Snake should has cords for head and tail at least');
        }

        // cords should be attached
        for (let i: number = 1; i < cords.length; i++) {
            const xDiff = Math.abs(cords[i].x - cords[i - 1].x);
            const yDiff = Math.abs(cords[i].y - cords[i - 1].y);

            if (xDiff > 1 || yDiff > 1) {
                throw new Error('Snake cords should be attached!');
            }
        }
    }
}