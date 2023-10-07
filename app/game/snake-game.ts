import config from '../configuration';
import {Game, Controller, EventsBus} from "@core";
import {SnakeChangeDirectionEvent, SnakeMoveEvent, GameStartOrEndEvent} from "@events";
import {FieldRender, SnakeRender} from "../renders";
import {snakeMovementMap} from "./snake-movement-map.ts";
import {Snake} from "./snake.ts";

export class SnakeGame extends Game {
    private _eventBus: EventsBus = new EventsBus();
    private _snake: Snake = new Snake(config.snake.cords, this._eventBus);
    private _snakeController: Controller = new Controller(this._eventBus);
    private _gameController: Controller = new Controller(this._eventBus);

    async init() {
        const fieldRender = new FieldRender(config.field);
        await fieldRender.renderField();

        const snakeRender = new SnakeRender();
        await snakeRender.renderSnake(this._snake);

        this.setControllers();

        this.watchSnakeMovement(snakeRender);
        this.watchGameEvents();
    }

    override start() {
        super.start();

        this._snakeController.activate();
        this._snake.moveForward(config.snake.speed);
    }

    override stop() {
        super.stop();

        this._snakeController.disable();
        this._snake.stopMoving();
    }

    private setControllers() {
        this._snakeController.setEventsByMap(snakeMovementMap);
        this._gameController.useEvent('Space', new GameStartOrEndEvent());
    }

    private watchSnakeMovement(snakeRender: SnakeRender) {
        this._eventBus.on(new SnakeChangeDirectionEvent(), (direction) => {
            this._snake.changeDirection(direction);
        });

        this._eventBus.on(new SnakeMoveEvent(), () => {
            snakeRender.renderSnake(this._snake).catch(console.error);
        });
    }

    private watchGameEvents() {
        this._eventBus.on(new GameStartOrEndEvent(), () => {
            if (!this.isActive) {
                this.start();
            } else {
                this.stop();
            }
        });
    }
}