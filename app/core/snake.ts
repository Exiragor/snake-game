import {Cord} from "./cord.js";

export class Snake {
    readonly head: Cord;
    readonly tail: Cord;
    readonly body: Cord[];

    constructor(cords: Cord[]) {
        Snake.validateCords(cords);

        this.head = cords.splice(0, 1)[0];
        this.tail = cords.splice(cords.length - 1, 1)[0];
        this.body = [...cords];
    }

    toArray(): Cord[] {
        return [this.head, ...this.body, this.tail];
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