import type {IConfiguration} from "./models/configuration.js";
import {Cord} from "./core/cord.js";

const config: IConfiguration =  {
    field: {
        size: {
            xCols: 20,
            yCols: 20,
            cellSize: 25,
        }
    },
    snake: {
        speed: 250,
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