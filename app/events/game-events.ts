import {Event} from "../core/event.js";

const gameEventsDomain = 'game';

export class GameStartEvent extends Event {
    constructor() {
        super('start', gameEventsDomain);
    }
}

export class GameEndEvent extends Event {
    constructor() {
        super('end', gameEventsDomain);
    }
}