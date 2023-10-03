export class Render {

    getElement<T extends HTMLElement>(selector: string): T {
        const element: T | null = document.querySelector(selector);

        if (!element) {
            throw new Error(`Can't find element by "${selector}" selector`)
        }

        return element;
    }
}