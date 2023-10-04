import config from './configuration.js';
import {Game} from "./core/game.js";
import {Snake} from "./core/snake.js";
import {Controller} from "./core/controller.js";
import {FieldRender} from "./renders/field-render.js";
import {SnakeRender} from "./renders/snake-render.js";

export class SnakeGame extends Game {
    private _snake: Snake | null = null;
    private _controller: Controller | null = null;

    init() {
        this._snake = new Snake(
            config.snake.cords.head,
            config.snake.cords.tail,
            config.snake.cords.body
        );
        this._controller = new Controller();

        const fieldRender = new FieldRender(config.field);
        fieldRender.renderField();

        const snakeRender = new SnakeRender(fieldRender);
        snakeRender.render(this._snake);
    }
}