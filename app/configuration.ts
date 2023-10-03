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
            head: new Cord(50, 50),
            body: [new Cord(50, 51), new Cord(50, 52)],
            tail: new Cord(50, 53),
        }
    }
}

export default config;