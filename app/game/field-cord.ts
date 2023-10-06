import {Cord} from "../core/cord.js";
import {IFieldConf} from "../models/configuration.js";
import config from "../configuration.js";

export class FieldCord extends Cord {
    private readonly _fieldConfig: IFieldConf;

    constructor(x: number, y: number) {
        super(x, y);

        this._fieldConfig = config.field;
    }

    getPosition() {
        return this.y * this._fieldConfig.size.xCols + this.x;
    }

    static fromCord(cord: Cord): FieldCord {
        return new FieldCord(cord.x, cord.y);
    }
}