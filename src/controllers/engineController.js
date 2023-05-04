class EngineController {
    constructor(engine) {
        this.engine = engine
    }

    sendPosition(currentPosition) {
        this.engine.postMessage(`position fen ${currentPosition}`)
    }

    evaluatePosition() {
        this.engine.postMessage('eval')
    }
}

export default EngineController;