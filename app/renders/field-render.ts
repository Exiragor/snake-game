import {Render} from "../core/render.js";
import {IFieldConf} from "../models/configuration.js";
import {Cord} from "app/core/cord";

export class FieldRender extends Render {
    private readonly _defaultSize = 10;
    private readonly _cellTpl: HTMLTemplateElement;

    readonly fieldWidth: number;
    readonly fieldHeight: number;

    constructor(
        fieldConfig: IFieldConf
    ) {
        super();

        this._cellTpl = this.getElement<HTMLTemplateElement>('#cell');
        this.fieldWidth = fieldConfig.size.xCols ?? this._defaultSize;
        this.fieldHeight = fieldConfig.size.yCols ?? this._defaultSize;
    }

    renderField() {
        const field = this.getElement<HTMLDivElement>('#field');

        field.style.gridTemplateColumns = `repeat(${this.fieldWidth}, 1fr)`;
        field.style.maxWidth = `${this.fieldWidth * 50}px`;

        for (const _ of new Array(this.fieldWidth * this.fieldHeight)) {
            field.appendChild(this._cellTpl.content.cloneNode(true));
        }
    }

    getCellPositionByCord(cord: Cord): number {
        return cord.y * this.fieldWidth + cord.x;
    }
}