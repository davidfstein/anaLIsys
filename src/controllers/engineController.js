
class EngineController {

    constructor() {
        const stockfishWorker = new Worker('/stockfish.js', { type: 'module' });
        stockfishWorker.postMessage('uci');
        stockfishWorker.onmessage = (event) => {
            if (event.data.includes('uciok')) {
                // Once the engine is ready, send the position
                stockfishWorker.postMessage('setoption name UCI_AnalyseMode value true');
                stockfishWorker.postMessage('setoption name Use NNUE value false')
                stockfishWorker.postMessage('position startpos');
                stockfishWorker.postMessage('setoption name Threads value 8');
                stockfishWorker.postMessage('setoption name Clear Hash');
                stockfishWorker.postMessage('setoption name Hash value 512');
            }
        }
        this.engine = stockfishWorker;
    }

    // static async build() {
    //     const stockfishWorker = new Worker('/stockfish.js', { type: 'module' });
    //     return new Promise((resolve) => {
    //       const initializeEngine = () => {
    //         stockfishWorker.postMessage('uci');
    //       }

    //       const handleMessage = async (event) => {
    //         const message = event.data;
    //         if (message === 'uciok') {
    //           stockfishWorker.postMessage('setoption name UCI_AnalyseMode value true');
    //           await EngineController.waitForReady(stockfishWorker)
    //           stockfishWorker.postMessage('position startpos');
    //           await EngineController.waitForReady(stockfishWorker)
    //           stockfishWorker.postMessage('setoption name Threads value 10');
    //           await EngineController.waitForReady(stockfishWorker)
    //           stockfishWorker.postMessage('setoption name Hash value 512');
    //           await EngineController.waitForReady(stockfishWorker)
    //         }
    //         resolve(new EngineController(stockfishWorker));
    //       }

    //       stockfishWorker.addEventListener("message", handleMessage);

    //       initializeEngine();
    //     })
    // }

    static async waitForReady(engine) {
        return new Promise((resolve) => {
          const checkReady = () => {
            engine.postMessage("isready");
          };
    
          const handleMessage = (event) => {
            const message = event.data;
            if (message === "readyok") {
              // Stockfish is ready
              resolve();
            }
          };
    
          // Listen for messages from Stockfish
          engine.removeEventListener("message", handleMessage);
          engine.addEventListener("message", handleMessage);
    
          // Start checking if Stockfish is ready
          checkReady();
        });
    }

    async sendPosition(currentPosition) {
        this.engine.postMessage(`position fen ${currentPosition}`)
        await EngineController.waitForReady(this.engine);
    }

    parseEvaluationMessage(message) {            
      const cpRegex = /.*score (cp|mate) (-?\d+).*/;
      const match = message.match(cpRegex);
      if (match) {
        return {type: match[1], value: parseInt(match[2])};
      } else {
        return null
      }
    };

    async evaluatePosition(depth = 20) {
        let evaluation = null;
        const waitForEval = async () => {
          return new Promise((resolve) => {
            const goDepth = () => { 
              this.engine.postMessage(`go depth ${depth} movetime 0`);
            }

            const handleMessage = (event) => {
              const message = event.data;
              if (message.startsWith(`info depth ${depth}`) && (message.includes(" cp ") || message.includes(" mate "))) {
                this.engine.postMessage('stop')
                this.engine.removeEventListener("message", handleMessage);
                resolve(this.parseEvaluationMessage(message));
              }
            };
    
            this.engine.removeEventListener("message", handleMessage);
            this.engine.addEventListener("message", handleMessage);
    
            goDepth();
          });
        };
        await EngineController.waitForReady(this.engine);
        evaluation = await waitForEval();
        this.engine.postMessage('stop')
        return new Promise((resolve, reject) => {          
          evaluation !== null ? resolve(evaluation) : reject(evaluation);
        });
    }

    cleanup() {
        this.engine.postMessage('quit');
        this.engine.terminate();
    }

}

export default EngineController;