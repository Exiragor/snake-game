export abstract class Game {
    protected score: number = 0;
    protected isActive: boolean = false;

    start() {
        this.isActive = true;
    }

    stop() {
        this.isActive = false;
    }

    restart() {
        this.score = 0;
        this.start();
    }

    increaseScore(deltaScore: number) {
        this.score += deltaScore;
    }
}