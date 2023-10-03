export class Event {
    protected _payload: unknown = undefined;

    readonly name: string = '';

    constructor(name: string, domain: string = '') {
        this.name = `${domain ? domain + ':' : ''}${name}`;
    }

    getPayload() {
        return this._payload;
    }
}