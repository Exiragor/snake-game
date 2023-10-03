import {Render} from "../core/render.js";
import {IFieldConf} from "../models/configuration.js";

export class FieldRender extends Render {
    private readonly _defaultSize = 10;
    private readonly _cellTpl: HTMLTemplateElement;
    private readonly _fieldWidth: number;
    private readonly _fieldHeight: number;
    constructor(
        fieldConfig: IFieldConf
    ) {
        super();

        this._cellTpl = this.getElement<HTMLTemplateElement>('#cell');
        this._fieldWidth = fieldConfig.size.xCols ?? this._defaultSize;
        this._fieldHeight = fieldConfig.size.yCols ?? this._defaultSize;
    }

    renderField() {
        const field = this.getElement<HTMLDivElement>('#field');

        field.style.gridTemplateColumns = `repeat(${this._fieldWidth}, 1fr)`;
        field.style.maxWidth = `${this._fieldWidth * 50}px`;

        for (const _ of new Array(this._fieldWidth * this._fieldHeight)) {
            field.appendChild(this._cellTpl.content.cloneNode(true));
        }
    }
}