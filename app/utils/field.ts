import {IFieldConf} from "@models";
import {FieldCord} from "../game";

export function getMaxPositionByFieldConf(fieldConfig: IFieldConf): number {
    return new FieldCord(
        fieldConfig.size.xCols - 1,
        fieldConfig.size.yCols - 1
    ).getPosition();
}