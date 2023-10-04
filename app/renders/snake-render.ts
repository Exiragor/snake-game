import {Render} from "../core/render.js";
import {Snake} from "../core/snake.js";
import {FieldRender} from "./field-render.js";
import {Cord} from "app/core/cord";

export class SnakeRender extends Render {
    private readonly _cells: HTMLDivElement[];

    constructor(
        readonly fieldRender: FieldRender,
    ) {
        super();

        this._cells = this.getElements<HTMLDivElement>('#field > .cell');
    }

    render(snake: Snake) {
        this.clearCells(snake);

        this.renderCell(snake.head, 'head');
        this.renderCell(snake.tail, 'tail');

        snake.body.forEach(cord => {
            this.renderCell(cord)
        });
    }

    private renderCell(cord: Cord, additionalClass: string = '') {
        const position = this.fieldRender.getCellPositionByCord(cord);
        const cls = ['snake'];

        if (additionalClass) {
            cls.push(additionalClass);
        }

        this._cells[position]?.classList.add(...cls);
    }

    private clearCell(cord: Cord) {
        const position = this.fieldRender.getCellPositionByCord(cord);
        const cls = ['snake', 'head', 'tail'];

        this._cells[position]?.classList.remove(...cls);
    }

    private clearCells(snake: Snake) {
        snake.toArray().forEach(cord => {
            this.clearCell(cord);
        });
    }
}