import { CP, Mate } from "./EvalObj.js";
import { mean } from "./utils.js";

class Evaluation {

    constructor(evals) {
        this.setEvals(evals);
    }

    setEvals = (evals) => {
        this.evals = evals.map(e => e.type === 'cp' ? new CP(e.value) : new Mate(e.value));
    }

    getCPLs = () => {
        if (this.evals === undefined || this.evals.length === 0) return [];

        const whiteCPLs = [];
        const blackCPLs = [];
        let cpPrev = new CP().getScoreInCentipawns();
        for (let i = 0; i < this.evals.length; i++) {
            let cp = this.evals[i].scoreCeiled();
            let cpl = Math.max(cpPrev + cp, 0);
            if (i % 2 === 0) {
              whiteCPLs.push(cpl);
              cpPrev = cp
            } else if (i % 2 !== 0) {
              blackCPLs.push(cpl)
              cpPrev = cp
            } else {
              cpPrev = cp
            }
        }
        return [whiteCPLs, blackCPLs];
    }

    getWinningChances = (cp) => {
        const wc = (2 / (1 + Math.exp(-0.00368208 * cp))) - 1;
        return Math.min(Math.max(-1, wc), 1);
    } 

    // https://lichess.org/page/accuracy
    calculateWinPercent = (cp) => {
        return 50 + (50 * this.getWinningChances(cp));
    }

    getMoveAccuracy = (winPercentBefore, winPercentAfter) => {
        const acc = 103.1668 * Math.exp(-0.04354 * (winPercentBefore - winPercentAfter)) - 3.1669;
        return Math.min(Math.max(acc + 1, 0), 100);
    }

    getGameAccuracy = () => {
        const winPercents = [new CP(), ...this.evals].map((evalObj, i) => {
            let value = evalObj.scoreCeiled() * -1;
            return this.calculateWinPercent(value);
        });
        console.log('Win percents:', winPercents);

        const accuracies = [];
        for (let index = 0; index + 1 < winPercents.length; index = index + 2) {
            const wp1 = winPercents[index];
            const wp2 = winPercents[index + 1];

            accuracies.push(this.getMoveAccuracy(wp1, wp2));
        }

        const whiteAccuracies = accuracies.filter((acc, index) => { if (index % 2 === 0) return acc });
        const blackAccuracies = accuracies.filter((acc, index) => { if (index % 2 !== 0) return acc });
        console.log('White Accuracies:', whiteAccuracies);
        console.log('Black Accuracies:', blackAccuracies);
        return [mean(whiteAccuracies), mean(blackAccuracies)];
    }
}

export { Evaluation };