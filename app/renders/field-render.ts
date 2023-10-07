import {Render} from "@core";
import {IFieldConf} from "@models";
import {cellTplSelector, fieldSelector} from "@consts";

export class FieldRender extends Render {
    private readonly _defaultSize = 10;
    private readonly _defaultCellSize = 50;
    private readonly _cellTpl: HTMLTemplateElement;

    readonly fieldWidth: number;
    readonly fieldHeight: number;
    readonly cellSize: number;

    constructor(fieldConfig: IFieldConf) {
        super();

        this._cellTpl = this.getElement<HTMLTemplateElement>(cellTplSelector);
        this.fieldWidth = fieldConfig.size.xCols ?? this._defaultSize;
        this.fieldHeight = fieldConfig.size.yCols ?? this._defaultSize;
        this.cellSize = fieldConfig.size.cellSize ?? this._defaultCellSize;
    }

    async renderField() {
        const field = this.getElement<HTMLDivElement>(fieldSelector);

        await this.render(() => {
            field.style.gridTemplateColumns = `repeat(${this.fieldWidth}, 1fr)`;
            field.style.maxWidth = `${this.fieldWidth * this.cellSize}px`;
            field.style.setProperty('--cell-size', `${this.cellSize}px`)
        });

        await this.render(() => {
            for (const _ of new Array(this.fieldWidth * this.fieldHeight)) {
                field.appendChild(this._cellTpl.content.cloneNode(true));
            }
        });
    }
}