export abstract class Game {
    protected score: number = 0;
    isActive: boolean = false;

    start() {
        this.isActive = true;
    }

    restart() {
        this.score = 0;
        this.start();
    }

    increaseScore(deltaScore: number) {
        this.score += deltaScore;
    }
}