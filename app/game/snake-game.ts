import config from '../configuration.js';
import {Game} from "../core/game.js";
import {Snake} from "../core/snake.js";
import {Controller} from "../core/controller.js";
import {FieldRender} from "../renders/field-render.js";
import {SnakeRender} from "../renders/snake-render.js";
import {EventsBus} from "../core/events-bus.js";
import {SnakeMoveEvent, SnakeMoveForwardEvent} from "../events/snake-events.js";
import {snakeMovementMap} from "../consts/controller.js";
import {GameEndEvent, GameStartEvent} from "../events/game-events.js";

export class SnakeGame extends Game {
    private _snake: Snake = new Snake(config.snake.cords);
    private _eventBus: EventsBus = new EventsBus();
    private _controller: Controller = new Controller(this._eventBus);
    private _snakeInterval: number | null = null;

    async init() {
        const fieldRender = new FieldRender(config.field);
        await fieldRender.renderField();

        const snakeRender = new SnakeRender();
        await snakeRender.renderSnake(this._snake);

        this.watchSnakeMoves(snakeRender);

        this._controller.useClickEvent('start', 'Space', new GameStartEvent());

        this._eventBus.on(new GameStartEvent(), () => {
            this._controller?.useClickEvent('end', 'Space', new GameEndEvent());
            this._controller?.removeClickEvent('start', 'Space');
            this.forceSnakeMovement();
            this._controller?.parseClickEventsMap('snakeMove', snakeMovementMap);
        });

        this._eventBus.on(new GameEndEvent(), () => {
            if (this._snakeInterval) {
                clearInterval(this._snakeInterval!);
                this._snakeInterval = null;
            }

            this._controller.useClickEvent('start', 'Space', new GameStartEvent());
            this._controller.removeClickEvent('end', 'Space');
            this._controller.removeByMap('snakeMove', snakeMovementMap);
        });
    }

    private watchSnakeMoves(render: SnakeRender) {
        this._eventBus.on(new SnakeMoveEvent(), (direction) => {
            this._snake.changeDirection(direction);
        });

        this._eventBus.on(new SnakeMoveForwardEvent(), () => {
            this._snake.moveForward();
            render.renderSnake(this._snake).catch(console.error);
        });
    }

    private forceSnakeMovement() {
        this._snakeInterval = setInterval(() => {
            this._eventBus.emit(new SnakeMoveForwardEvent());
        }, config.snake.speed);
    }
}