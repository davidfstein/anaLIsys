// Fix the multiple additions of listeners. Probably just add once at initialization 
class EngineController {

    constructor(stockfishWorker) {
        if (stockfishWorker === null) {
          throw new Error('Constructor cannot be called directly, use build')
        }
        this.engine = stockfishWorker;
    }

    static async build() {
        const stockfishWorker = await Stockfish();
        return new Promise((resolve) => {
          const initializeEngine = () => {
            stockfishWorker.postMessage('ucinewgame');
          }

          const handleMessage = async (message) => {
            if (message === 'uciok') {
              stockfishWorker.postMessage('setoption name UCI_AnalyseMode value true');
              await EngineController.waitForReady(stockfishWorker)
              stockfishWorker.postMessage('setoption name Threads value 10');
              await EngineController.waitForReady(stockfishWorker)
              stockfishWorker.postMessage('setoption name Clear Hash');
              await EngineController.waitForReady(stockfishWorker)
              stockfishWorker.postMessage('setoption name Hash value 4096');
              await EngineController.waitForReady(stockfishWorker)
              stockfishWorker.postMessage('position startpos');
              await EngineController.waitForReady(stockfishWorker)
            }
            resolve(new EngineController(stockfishWorker));
          }

          stockfishWorker.addMessageListener(handleMessage);

          initializeEngine();
        })
    }

    static async waitForReady(engine) {
        return new Promise((resolve) => {
          const checkReady = () => {
            engine.postMessage("isready");
          };
    
          const handleMessage = (message) => {
            if (message === "readyok") {
              // Stockfish is ready
              resolve();
            }
          };
    
          // Listen for messages from Stockfish
          engine.removeMessageListener(handleMessage);
          engine.addMessageListener(handleMessage);
    
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

            const handleMessage = (message) => {
              if (message.startsWith(`info depth ${depth}`) && (message.includes(" cp ") || message.includes(" mate "))) {
                this.engine.postMessage('stop')
                this.engine.removeMessageListener(handleMessage);
                resolve(this.parseEvaluationMessage(message));
              }
            };
    
            this.engine.removeMessageListener(handleMessage);
            this.engine.addMessageListener(handleMessage);
    
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