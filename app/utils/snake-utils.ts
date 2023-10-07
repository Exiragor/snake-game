import {Cord} from "@core";

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
        const hasNegative = snakeCords.some(c => c.hasNegativeNum());
        if (hasNegative) {
            return false;
        }

        return new Set(snakeCords.map(c => c.toString())).size === snakeCords.length;
    }
}