import {Event} from "../core/event.js";

const gameEventsDomain = 'game';

export class GameStartOrEndEvent extends Event {
    constructor() {
        super('start', gameEventsDomain);
    }
}
