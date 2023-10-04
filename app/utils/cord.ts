import {Cord} from "../core/cord.js";

export const getCellPositionByCord = (cord: Cord, fieldWidth: number): number => {
    return cord.y * fieldWidth + cord.x;
}