import {Cord} from "./cord.js";

export class Snake {
    constructor(
        readonly head: Cord,
        readonly tail: Cord,
        readonly body: Cord[]
    ) {}

    toArray(): Cord[] {
        return [this.head, ...this.body, this.tail];
    }
}