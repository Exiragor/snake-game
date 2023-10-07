import {Render} from "@core";
import {cellsSelector} from "@consts";
import {getRandomInt} from "../utils";

export class AppleRender extends Render {
    private _appleInterval: number | null = null;
    private _blockedPositions: number[] = [];
    private _lastPosition: number = 0;
    private readonly _cells: HTMLDivElement[];

    constructor(
        readonly maxPosition: number,
        readonly appleTime: number
    ) {
        super();

        this._cells = this.getElements<HTMLDivElement>(cellsSelector);
    }

    get position() {
        return this._lastPosition;
    }


    startSpawnApples() {
        this.spawnApples().catch(console.error);

        this._appleInterval = setInterval(() => {
            this.clearApple().catch(console.error);
            this.spawnApples().catch(console.error);
        }, this.appleTime);
    }

    stopSpawnApples() {
        if (this._appleInterval) {
            clearInterval(this._appleInterval);
            this._appleInterval = null;
        }

        this.clearApple().catch(console.error);
    }

    async clearApple() {
        await this.render(() => {
            this._cells[this._lastPosition]?.classList.remove('apple');
        });
    }

    async spawnApples() {
        let randomPosition: number;

        do {
            randomPosition = getRandomInt(this.maxPosition);
        } while (this._blockedPositions.includes(randomPosition));

        await this.render(() => {
            this._cells[randomPosition]?.classList.add('apple');
            this._lastPosition = randomPosition;
        });
    }

    setBlockedPositions(positions: number[]) {
        this._blockedPositions = positions;
    }
}