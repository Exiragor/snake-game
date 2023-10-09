import {Render} from "@core";
import {cellsSelector} from "@consts";
import {getRandomInt} from "../utils";
import {FieldCord} from "../game";

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

    checkOnAppleCell(fieldCord: FieldCord): boolean {
        return fieldCord.getPosition() === this._lastPosition;
    }

    startSpawnApples(useLastPosition: boolean = false) {
        this.spawnApple(useLastPosition ? this._lastPosition : 0).catch(console.error);

        this._appleInterval = setInterval(() => {
            this.clearApple().catch(console.error);
            this.spawnApple().catch(console.error);
        }, this.appleTime);
    }

    stopSpawnApples() {
        if (this._appleInterval) {
            clearInterval(this._appleInterval);
            this._appleInterval = null;
        }

        this.clearApple().catch(console.error);
    }

    eatApple() {
        this.stopSpawnApples();
        this.startSpawnApples();
    }

    async clearApple() {
        await this.render(() => {
            this._cells[this._lastPosition]?.classList.remove('apple');
        });
    }

    async spawnApple(position: number = 0) {
        console.log(position);
        let randomPosition: number;

        do {
            randomPosition = position || getRandomInt(this.maxPosition);
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