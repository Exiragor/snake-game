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
    private _snake: Snake | null = null;
    private _controller: Controller | null = null;
    private _eventBus: EventsBus | null = null;
    private _snakeInterval: number | null = null;

    async init() {
        this._snake = new Snake(config.snake.cords);
        this._eventBus = new EventsBus();
        this._controller = new Controller(this._eventBus);

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
            clearInterval(this._snakeInterval!);
            this._snakeInterval = null;
            this._controller?.useClickEvent('start', 'Space', new GameStartEvent());
            this._controller?.removeClickEvent('end', 'Space');
            this._controller?.removeByMap('snakeMove', snakeMovementMap);
        });
    }

    private watchSnakeMoves(render: SnakeRender) {
        this._eventBus!.on(new SnakeMoveEvent(), (direction) => {
            if (this._snake) {
                this._snake.changeDirection(direction);
            }
        });

        this._eventBus!.on(new SnakeMoveForwardEvent(), () => {
            if (this._snake) {
                this._snake.moveForward();
                render.renderSnake(this._snake).catch(console.error);
            }
        });
    }

    private forceSnakeMovement() {
        this._snakeInterval = setInterval(() => {
            this._eventBus?.emit(new SnakeMoveForwardEvent());
        }, config.snake.speed);
    }
}