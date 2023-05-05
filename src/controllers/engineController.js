class EngineController {
    constructor(engine) {
        this.engine = engine
    }

    sendPosition(currentPosition) {
        this.engine.postMessage(`position fen ${currentPosition}`)
    }

    handleEvaluateMessage(engine, messagePrefix = 'info depth') {
        return new Promise(resolve => {
          engine.onmessage = (event) => {
            const message = event.data;
            if (message.startsWith(messagePrefix)) {
              resolve(message);
            }
          };
        });
      }

    async evaluatePosition(depth = null) {
        if (!depth) {
            this.engine.postMessage('eval')
        } else {
            this.engine.postMessage(`go depth ${depth} eval`)
            const message = await this.handleEvaluateMessage(this.engine);
            const cpRegex = /.*score cp (-?\d+).*/;
            const match = message.match(cpRegex);
            const centipawnLoss = match ? parseInt(match[1]) : null;
            return centipawnLoss;
        }
    }
}

export default EngineController;