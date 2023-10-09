import {Render} from "@core";
import {scoreSelector} from "@consts";

export class StateRender extends Render {
    private _scoreSpan: HTMLSpanElement;

    constructor() {
        super();

        this._scoreSpan = this.getElement(scoreSelector);
    }

    changeScore(score: number) {
        this.render(() => {
            this._scoreSpan.innerText = score.toString();
        }).catch(console.error);
    }
}