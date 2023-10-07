import {Cord} from "@core";
import {SnakeDirection} from "@models";
import config from "../configuration.ts";

export class SnakeUtils {
    static validateCords(cords: Cord[]) {
        if (cords.length < 2) {
            throw new Error('Snake should has cords for head and tail at least');
        }

        // cords should be attached
        for (let i: number = 1; i < cords.length; i++) {
            const xDiff = Math.abs(cords[i].x - cords[i - 1].x);
            const yDiff = Math.abs(cords[i].y - cords[i - 1].y);

            if (xDiff > 1 || yDiff > 1) {
                throw new Error('Snake cords should be attached!');
            }
        }
    }

    static checkCollisions(snakeCords: Cord[]): boolean {
        const outOfField = snakeCords.some(c =>
            c.hasNegativeNum() ||
            c.x >= config.field.size.xCols ||
            c.y >= config.field.size.yCols
        );

        if (outOfField) {
            return false;
        }

        return new Set(snakeCords.map(c => c.toString())).size === snakeCords.length;
    }

    static checkOppositeDirection(currDirection: SnakeDirection, newDirection: SnakeDirection) {
        const relative = [
            ['up', 'down'],
            ['left', 'right']
        ];

        return relative.some(d => d.includes(currDirection) && d.includes(newDirection));
    }
}