export abstract class Game {
    protected score: number = 0;
    protected isActive: boolean = false;

    start() {
        this.isActive = true;
    }

    stop() {
        this.isActive = false;
    }

    restore() {
        this.stop();
        this.score = 0;
    }

    increaseScore(deltaScore: number) {
        this.score += deltaScore;
    }
}