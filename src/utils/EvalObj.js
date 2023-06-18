const INITIAL_CP = 15;
const MAX_VAL = 2147483647;
const MIN_VAL = -2147483648;

class EvalObj {

    constructor(value) {
        this.value = value;
    }

    getScoreInCentipawns = () => this.value;

    scoreCeiled = () => Math.min(Math.max(-1000, this.getScoreInCentipawns()), 1000);
}

class CP extends EvalObj {

    constructor(value = INITIAL_CP) {
        super(value);
    }

}

class Mate extends EvalObj {

    getScoreInCentipawns = () => this.value < 0 ? MIN_VAL + this.value : MAX_VAL - this.value;

}

export { CP, Mate };