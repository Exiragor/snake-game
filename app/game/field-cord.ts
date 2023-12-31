import {Cord} from "@core";
import {IFieldConf} from "@models";
import config from "../configuration";

export class FieldCord extends Cord {
    private readonly _fieldConfig: IFieldConf;

    constructor(x: number, y: number) {
        super(x, y);

        this._fieldConfig = config.field;
    }

    getPosition() {
        return Math.abs(this.y) * this._fieldConfig.size.xCols + Math.abs(this.x);
    }

    static fromCord(cord: Cord): FieldCord {
        return new FieldCord(cord.x, cord.y);
    }
}