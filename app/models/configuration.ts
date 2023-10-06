import {ICord} from "./cord.js";

export interface IFieldConf {
    size: {
        xCols: number;
        yCols: number;
        cellSize: number;
    }
}

export interface ISnakeConf {
    speed: number;
    cords: ICord[];
}

export interface IConfiguration {
    field: IFieldConf;
    snake: ISnakeConf;
}