import {Event} from "./event";
import {EventsBus} from "./events-bus";
import {ClickOpts} from "@models";
import {defaultClickOpts, keyDownEvent} from "@consts";

export class Controller {
    private _eventBus: EventsBus;
    private _disabled: boolean = false;

    listeners: Map<string, Set<(ev: DocumentEventMap[typeof keyDownEvent]) => void>> = new Map();

    constructor(eventBus?: EventsBus) {
        this._eventBus = eventBus ?? new EventsBus();
    }

    useEvent(keyCode: string, event: Event, opts: Partial<ClickOpts> = {}) {
        const keyDownOpts = {...defaultClickOpts, ...opts};

        const listener = (ev: DocumentEventMap[typeof keyDownEvent]) => {
            if (ev.code === keyCode &&
                ev.ctrlKey === keyDownOpts.ctrl &&
                ev.altKey === keyDownOpts.alt &&
                ev.shiftKey === keyDownOpts.shift
            ) {
                if (!this._disabled) {
                    this._eventBus.emit(event);
                }
            }
        };

        document.addEventListener(keyDownEvent, listener);

        if (!this.listeners.has(keyCode)) {
            this.listeners.set(keyCode, new Set());
        }

        this.listeners.get(keyCode)!.add(listener);
    }

    setEventsByMap(map: Record<string, Event>) {
        Object.keys(map).forEach(key => {
            this.useEvent(key, map[key]);
        });
    }

    disable() {
        this._disabled = true;
    }

    activate() {
        this._disabled = false;
    }
}