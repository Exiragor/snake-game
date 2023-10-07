import config from '../configuration';
import {Game, Controller, EventsBus} from "@core";
import {SnakeChangeDirectionEvent, SnakeMoveEvent, GameToggleEvent, GameRestoreEvent, SnakeBreakEvent} from "@events";
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

        this.watchSnakeMovement(snakeRender, fieldRender);
        this.watchGameEvents(snakeRender, fieldRender);
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
        this._gameController.useEvent('Space', new GameToggleEvent());
        this._gameController.useEvent('Escape', new GameRestoreEvent());
    }

    private watchSnakeMovement(snakeRender: SnakeRender, fieldRender: FieldRender) {
        this._eventBus.on(new SnakeChangeDirectionEvent(), (direction) => {
            this._snake.changeDirection(direction);
        });

        this._eventBus.on(new SnakeMoveEvent(), () => {
            snakeRender.renderSnake(this._snake).catch(console.error);
        });

        this._eventBus.on(new SnakeBreakEvent(), () => {
            this.finish();
            fieldRender.finishGameRender().catch(console.error);
        });
    }

    private watchGameEvents(snakeRender: SnakeRender, fieldRender: FieldRender) {
        this._eventBus.on(new GameToggleEvent(), () => {
            if (!this.isActive && !this.finished) {
                this.start();
                fieldRender.hideState().catch(console.error);
            } else if (this.isActive) {
                this.stop();
                fieldRender.pauseGame().catch(console.error);
            }
        });

        this._eventBus.on(new GameRestoreEvent(), () => {
            this.restore();
            snakeRender.destroySnake(this._snake)
                .then(() => {
                    this._snake = new Snake(config.snake.cords, this._eventBus);
                    return snakeRender.renderSnake(this._snake);
                })
                .then(() => fieldRender.refreshGame())
                .catch(console.error);
        });
    }
}