import type {IConfiguration} from "@models";
import {Cord} from "@core";

const config: IConfiguration =  {
    field: {
        size: {
            xCols: 16,
            yCols: 16,
            cellSize: 25,
        },
        appleTime: 4500,
    },
    snake: {
        speed: 150,
        cords: [
            new Cord(8, 6),
            new Cord(8, 7),
            new Cord(8, 8),
            new Cord(8, 9),
            new Cord(8, 10),
        ]
    }
}

export default config;