import {ICord} from "@models";

export class Cord implements ICord {
    constructor(
        readonly x: number,

        readonly y: number
    ) {}

    hasNegativeNum(): boolean {
        return this.x < 0 || this.y < 0;
    }

    toString(): string {
        return `${this.x}-${this.y}`;
    }
}