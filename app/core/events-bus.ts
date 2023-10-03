import {Event} from "./event.js";

type Action = (payload: unknown) => unknown;

export class EventsBus {
    private events: Map<string, Set<Action>> = new Map();

    on(event: Event, action: Action) {
        if (!this.events.has(event.name)) {
            this.events.set(event.name, new Set<Action>());
        }

        this.events.get(event.name)!.add(action);
    }

    off(event: Event, action: Action) {
        if (this.events.has(event.name)) {
            const actions = this.events.get(event.name)!;
            actions.delete(action);

            if (actions.size === 0) {
                this.events.delete(event.name);
            }
        }
    }

    emit(event: Event) {
        this.events.get(event.name)?.forEach(action => {
            try {
                action(event.getPayload());
            } catch (e) {
                console.error('Error in EventBus: ', e);
            }
        });
    }
}