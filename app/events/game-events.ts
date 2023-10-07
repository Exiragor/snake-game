import {Event} from "@core";

const gameEventsDomain = 'game';

export class GameToggleEvent extends Event {
    constructor() {
        super('toggle', gameEventsDomain);
    }
}

export class GameRestoreEvent extends Event {
    constructor() {
        super('restore', gameEventsDomain);
    }
}
