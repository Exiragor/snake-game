import {Cord} from "./cord.js";
import {SnakeDirection} from "../models/snake.js";

export class Snake {
    private _prevCords: Cord[] = [];

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

    move(direction: SnakeDirection, withGrowth = false) {
        this._prevCords = this.toArray();
        this.makeSnake(this.getNewCords(direction));
    }

    private makeSnake(cords: Cord[]) {
        this.head = cords.splice(0, 1)[0];
        this.tail = cords.splice(cords.length - 1, 1)[0];
        this.body = [...cords];
    }

    private getNewCords(direction: SnakeDirection): Cord[] {
        const curr = this.toArray();

        switch (direction) {
            case "up":
                return curr.map(({x, y}) => new Cord(x, --y));
            case "down":
                return curr.map(({x, y}) => new Cord(x, ++y));
            case "left":
                return curr.map(({x, y}) => new Cord(--x, y));
            case "right":
                return curr.map(({x, y}) => new Cord(++x, y));
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