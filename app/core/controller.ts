import {Event} from "./event.js";
import {EventsBus} from "./events-bus.js";
import {ClickOpts} from "../models/controller.js";
import {defaultClickOpts, keyDownEvent} from "../consts/controller.js";

export class Controller {
    private _eventBus: EventsBus;

    listeners: Map<string, Set<(ev: any) => void>> = new Map();

    constructor(eventBus?: EventsBus) {
        this._eventBus = eventBus ?? new EventsBus();
    }

    useClickEvent(keyCode: string, event: Event, opts: Partial<ClickOpts> = {}) {
        const keyDownOpts = {...defaultClickOpts, ...opts};

        const listener = (ev: DocumentEventMap[typeof keyDownEvent]) => {
            if (ev.code === keyCode &&
                ev.ctrlKey === keyDownOpts.ctrl &&
                ev.altKey === keyDownOpts.alt &&
                ev.shiftKey === keyDownOpts.shift
            ) {
                this._eventBus.emit(event);
            }
        };

        document.addEventListener(keyDownEvent, listener);

        if (!this.listeners.has(keyCode)) {
            this.listeners.set(keyCode, new Set());
        }

        this.listeners.get(keyCode)!.add(listener);

    }
}