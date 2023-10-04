export class Render {

    getElement<T extends HTMLElement>(selector: string): T {
        const element: T | null = document.querySelector(selector);

        if (!element) {
            throw new Error(`Can't find element by "${selector}" selector`)
        }

        return element;
    }

    getElements<T extends HTMLElement>(selector: string): T[] {
        const elements: T[] = [...document.querySelectorAll<T>(selector)];

        if (!elements.length) {
            throw new Error(`Can't find elements by "${selector}" selector`)
        }

        return elements;
    }
}