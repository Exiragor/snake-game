import {ICord} from "@models";

export class Cord implements ICord {
    constructor(
        readonly x: number,

        readonly y: number
    ) {}
}