import {Event} from "./event.js";
import {EventsBus} from "./events-bus.js";
import {ClickOpts} from "../models/controller.js";
import {defaultClickOpts, keyDownEvent} from "../consts/controller.js";

export class Controller {
    private _eventBus: EventsBus;

    listeners: Map<string, Map<string, (ev: DocumentEventMap[typeof keyDownEvent]) => void>> = new Map();

    constructor(eventBus?: EventsBus) {
        this._eventBus = eventBus ?? new EventsBus();
    }

    useClickEvent(name: string, keyCode: string, event: Event, opts: Partial<ClickOpts> = {}) {
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
            this.listeners.set(keyCode, new Map());
        }

        this.listeners.get(keyCode)!.set(name, listener);

    }

    removeClickEvent(name: string, keyCode: string) {
        if (this.listeners.has(keyCode) && this.listeners.get(keyCode)?.has(name)) {
            const listeners = this.listeners.get(keyCode)!;
            document.removeEventListener(keyDownEvent, listeners.get(name)!);
            listeners.delete(name);

            if (listeners.size > 0) {
                this.listeners.set(keyCode, listeners);
            } else {
                this.listeners.delete(keyCode);
            }
        }
    }

    removeByMap(name: string, map: Record<string, Event>) {
        Object.keys(map).forEach(key => {
            this.removeClickEvent(name, key);
        });
    }

    parseClickEventsMap(name: string, map: Record<string, Event>) {
        Object.keys(map).forEach(key => {
            this.useClickEvent(name, key, map[key]);
        });
    }
}