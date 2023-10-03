import {ICord} from "../models/cord.js";

export class Cord implements ICord {
    constructor(
        readonly x: number,

        readonly y: number
    ) {}
}