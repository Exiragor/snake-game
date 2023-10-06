import {Event} from "./event.js";
import {EventsBus} from "./events-bus.js";

export class Controller {
    private _eventBus: EventsBus;

    listeners: Map<string, Set<(ev: any) => void>> = new Map();

    constructor(eventBus?: EventsBus) {
        this._eventBus = eventBus ?? new EventsBus();
    }
    use(key: keyof DocumentEventMap, event: Event) {
        const listener = (ev: DocumentEventMap[typeof key]) => {
            this._eventBus.emit(event);
        };

        document.addEventListener(key, listener);

        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
        }

        this.listeners.get(key)!.add(listener);
    }
}