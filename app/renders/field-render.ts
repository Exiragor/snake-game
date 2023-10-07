import {Render} from "@core";
import {IFieldConf} from "@models";
import {cellTplSelector, fieldSelector, fieldStateSelector, GameStateTexts} from "@consts";

export class FieldRender extends Render {
    private readonly _defaultSize = 10;
    private readonly _defaultCellSize = 50;
    private readonly _cellTpl: HTMLTemplateElement;
    private readonly _fieldDiv: HTMLDivElement;
    private readonly _stateDiv: HTMLDivElement;

    readonly fieldWidth: number;
    readonly fieldHeight: number;
    readonly cellSize: number;

    constructor(fieldConfig: IFieldConf) {
        super();

        this._cellTpl = this.getElement<HTMLTemplateElement>(cellTplSelector);
        this._stateDiv = this.getElement<HTMLDivElement>(fieldStateSelector);
        this._fieldDiv = this.getElement<HTMLDivElement>(fieldSelector);
        this.fieldWidth = fieldConfig.size.xCols ?? this._defaultSize;
        this.fieldHeight = fieldConfig.size.yCols ?? this._defaultSize;
        this.cellSize = fieldConfig.size.cellSize ?? this._defaultCellSize;
    }

    async renderField() {
        await this.render(() => {
            this._fieldDiv.style.gridTemplateColumns = `repeat(${this.fieldWidth}, 1fr)`;
            this._fieldDiv.style.maxWidth = `${this.fieldWidth * this.cellSize}px`;
            this._fieldDiv.style.setProperty('--cell-size', `${this.cellSize}px`)
        });

        await this.render(() => {
            for (const _ of new Array(this.fieldWidth * this.fieldHeight)) {
                this._fieldDiv.appendChild(this._cellTpl.content.cloneNode(true));
            }
        });
    }

    async finishGameRender() {
        await this.render(() => {
            this._fieldDiv.classList.add('finished');
        });
        await this.showState(GameStateTexts.Finished);
    }

    async refreshGame() {
        await this.render(() => {
            this._fieldDiv.classList.remove('finished');
        });
        await this.hideState();
    }

    async pauseGame() {
        await this.showState(GameStateTexts.Paused);
    }

    async showState(text: GameStateTexts) {
        await this.render(() => {
            this._stateDiv.innerText = text;
            this._stateDiv.classList.add('visible');
        });
    }

    async hideState() {
        await this.render(() => {
            this._stateDiv.innerText = '';
            this._stateDiv.classList.remove('visible');
        });
    }
}