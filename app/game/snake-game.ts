import config from '../configuration.js';
import {Game} from "../core/game.js";
import {Snake} from "../core/snake.js";
import {Controller} from "../core/controller.js";
import {FieldRender} from "../renders/field-render.js";
import {SnakeRender} from "../renders/snake-render.js";
import {EventsBus} from "../core/events-bus.js";
import {SnakeMoveEvent} from "../events/snake-events.js";
import {SnakeDirection} from "../models/snake.js";

export class SnakeGame extends Game {
    private _snake: Snake | null = null;
    private _controller: Controller | null = null;
    private _eventBus: EventsBus | null = null;

    async init() {
        this._snake = new Snake(config.snake.cords);
        this._eventBus = new EventsBus();
        this._controller = new Controller(this._eventBus);

        const fieldRender = new FieldRender(config.field);
        await fieldRender.renderField();

        const snakeRender = new SnakeRender();
        await snakeRender.renderSnake(this._snake);

        this._eventBus.on(new SnakeMoveEvent(), (direction) => {
            console.log(this._snake, direction);
            if (this._snake) {
                console.log(this._snake.toArray());
                this._snake.move(direction);
                console.log(this._snake.toArray());
                snakeRender.renderSnake(this._snake);
            }
        });

        this._controller.use('keydown', new SnakeMoveEvent('up'));
    }
}