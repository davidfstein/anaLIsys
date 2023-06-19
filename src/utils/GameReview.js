
class GameReview {

    constructor(cpls, bestMoves, moves) {
        this.cpls = cpls;
        this.bestMoves = bestMoves;
        this.moves = moves;
        this.inaccuracies = cpls.map(cpl => this.isInaccurate(cpl));
        this.mistakes = cpls.map(cpl => this.isMistake(cpl));
        this.blunders = cpls.map(cpl => this.isBlunder(cpl));
        this.goods = cpls.map(cpl => this.isGood(cpl));
        this.excellents = cpls.map((cpl, index) => this.isExcellent(cpl, index));
        this.bests = cpls.map((_, index) => this.isBest(index));
    }

    isInaccurate = (cpl) => cpl >= 50 && cpl < 100;
    isMistake = (cpl) => cpl >= 100 && cpl < 300;
    isBlunder = (cpl) => cpl >= 300;
    isGood = (cpl) => cpl <= 50 && cpl > 25;
    isExcellent = (cpl, index) => !this.isBest(index) && cpl <= 25;
    isBest = (index) => this.bestMoves[index] === this.moves[index]; 

    count = (arr) =>  arr.filter(Boolean).length;

    innaccuracyCount = () => this.count(this.inaccuracies);
    mistakeCount = () => this.count(this.mistakes);
    blunderCount = () => this.count(this.blunders);
    goodCount = () => this.count(this.goods);
    excellentCount = () => this.count(this.excellents);
    bestCount = () => this.count(this.bests);
}

export { GameReview };