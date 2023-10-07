import config from '../configuration';
import {Game, Controller, EventsBus} from "@core";
import {SnakeChangeDirectionEvent, SnakeMoveEvent, GameToggleEvent, GameRestoreEvent, SnakeBreakEvent} from "@events";
import {AppleRender, FieldRender, SnakeRender} from "../renders";
import {snakeMovementMap} from "./snake-movement-map.ts";
import {Snake} from "./snake.ts";
import {FieldCord} from "./field-cord.ts";
import {getMaxPositionByFieldConf} from "../utils";

export class SnakeGame extends Game {
    private _eventBus: EventsBus = new EventsBus();
    private _snake: Snake = new Snake(config.snake.cords, this._eventBus);
    private _snakeController: Controller = new Controller(this._eventBus);
    private _gameController: Controller = new Controller(this._eventBus);

    private _fieldRender: FieldRender = new FieldRender(config.field);
    private _snakeRender!: SnakeRender;
    private _appleRender!: AppleRender;

    // main init method
    async init() {
        await this._fieldRender.renderField();

        this._snakeRender = new SnakeRender();
        await this._snakeRender.renderSnake(this._snake);

        this._appleRender = new AppleRender(
            getMaxPositionByFieldConf(config.field),
            config.field.appleTime)

        this._appleRender.setBlockedPositions(
            this._snake
                .toArray()
                .map(c => FieldCord.fromCord(c).getPosition())
        );

        this.setControllers();

        this.watchSnakeMovement();
        this.watchGameEvents();
    }

    override start() {
        super.start();

        this._snakeController.activate();
        this._snake.moveForward(config.snake.speed);
        this._fieldRender.hideState().catch(console.error);
        this._appleRender.startSpawnApples();
    }

    override stop() {
        super.stop();

        this._snakeController.disable();
        this._snake.stopMoving();
        this._appleRender.stopSpawnApples();
        this._fieldRender.pauseGame().catch(console.error);
    }

    private setControllers() {
        this._snakeController.setEventsByMap(snakeMovementMap);
        this._gameController.useEvent('Space', new GameToggleEvent());
        this._gameController.useEvent('Escape', new GameRestoreEvent());
    }

    private watchSnakeMovement() {
        this._eventBus.on(new SnakeChangeDirectionEvent(), (direction) => {
            this._snake.changeDirection(direction);
        });

        this._eventBus.on(new SnakeMoveEvent(), () => {
            this._snakeRender.renderSnake(this._snake).catch(console.error);
            this._appleRender.setBlockedPositions(
                this._snake
                    .toArray()
                    .map(c => FieldCord.fromCord(c).getPosition())
            );
        });

        this._eventBus.on(new SnakeBreakEvent(), () => {
            this.finish();
            this._fieldRender.finishGameRender().catch(console.error);
        });
    }

    private watchGameEvents() {
        this._eventBus.on(new GameToggleEvent(), () => {
            if (!this.isActive && !this.finished) {
                this.start();
            } else if (this.isActive) {
                this.stop();
            }
        });

        this._eventBus.on(new GameRestoreEvent(), () => {
            this.restore();
            this._snakeRender.destroySnake(this._snake)
                .then(() => {
                    this._snake = new Snake(config.snake.cords, this._eventBus);
                    return this._snakeRender.renderSnake(this._snake);
                })
                .then(() => this._fieldRender.refreshGame())
                .catch(console.error);
        });
    }
}