import type {IConfiguration} from "@models";
import {Cord} from "@core";

const config: IConfiguration =  {
    field: {
        size: {
            xCols: 20,
            yCols: 20,
            cellSize: 25,
        },
        appleTime: 4500,
    },
    snake: {
        speed: 150,
        cords: [
            new Cord(10, 8),
            new Cord(10, 9),
            new Cord(10, 10),
            new Cord(10, 11),
            new Cord(10, 12),
        ]
    }
}

export default config;