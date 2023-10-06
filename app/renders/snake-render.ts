import {Render} from "../core/render.js";
import {Snake} from "../core/snake.js";
import {FieldCord} from "../game/field-cord.js";
import {cellsSelector} from "../consts/selectors.js";

export class SnakeRender extends Render {
    private readonly _cells: HTMLDivElement[];

    constructor() {
        super();

        this._cells = this.getElements<HTMLDivElement>(cellsSelector);
    }

    render(snake: Snake) {
        this.clearCells(snake);

        this.renderCell(FieldCord.fromCord(snake.head), 'head');
        this.renderCell(FieldCord.fromCord(snake.tail), 'tail');

        snake.body.forEach(cord => {
            this.renderCell(FieldCord.fromCord(cord))
        });
    }

    private renderCell(cord: FieldCord, additionalClass: string = '') {
        const cls = ['snake'];

        if (additionalClass) {
            cls.push(additionalClass);
        }

        this._cells[cord.getPosition()]?.classList.add(...cls);
    }

    private clearCell(cord: FieldCord) {
        const cls = ['snake', 'head', 'tail'];

        this._cells[cord.getPosition()]?.classList.remove(...cls);
    }

    private clearCells(snake: Snake) {
        snake.toArray().forEach(cord => {
            this.clearCell(FieldCord.fromCord(cord));
        });
    }
}