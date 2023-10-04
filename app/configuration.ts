import type {IConfiguration} from "./models/configuration.js";
import {Cord} from "./core/cord.js";

const config: IConfiguration =  {
    field: {
        size: {
            xCols: 10,
            yCols: 10,
            cellSize: 50,
        }
    },
    snake: {
        speed: 1000,
        cords: {
            head: new Cord(5, 4),
            body: [new Cord(5, 5), new Cord(5, 6)],
            tail: new Cord(5, 7),
        }
    }
}

export default config;