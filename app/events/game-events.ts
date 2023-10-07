import {Event} from "@core";

const gameEventsDomain = 'game';

export class GameStartOrEndEvent extends Event {
    constructor() {
        super('start', gameEventsDomain);
    }
}
