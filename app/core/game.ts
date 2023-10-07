export abstract class Game {
    protected score: number = 0;
    protected isActive: boolean = false;
    protected finished = false;

    start() {
        this.isActive = true;
    }

    stop() {
        this.isActive = false;
    }

    restore() {
        this.stop();
        this.score = 0;
        this.finished = false;
    }

    finish() {
        this.stop();
        this.finished = true;
    }

    increaseScore(deltaScore: number) {
        this.score += deltaScore;
    }
}