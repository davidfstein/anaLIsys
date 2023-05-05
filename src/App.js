import Board from './components/board';
import { Chess } from 'chess.js';
import AnalysisBar from './components/analysisbar';
import UserIcon from './components/usericon';
import EvaluationBar from './components/evaluationBar';
import AnalysisProgressModal from './components/analysisProgressModal';
import { zip } from './utils/utils';
import { setEngine } from './reducers/gameSlice';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react';
import EngineController from './controllers/engineController';
import { useState } from "react";

function App() {
  const white = useSelector((state) => state.game.whitePlayer)
  const black = useSelector((state) => state.game.blackPlayer)
  const whiteElo = useSelector((state) => state.game.whiteRating)
  const blackElo = useSelector((state) => state.game.blackRating)
  const whiteImageUrl = useSelector((state) => state.game.whiteImage)
  const blackImageUrl = useSelector((state) => state.game.blackImage)
  const opening = useSelector((state) => state.game.opening)
  const whiteMoves = useSelector((state) => state.game.whiteMoves);
  const blackMoves = useSelector((state) => state.game.blackMoves);
  const [moves, setMoves] = useState([]);
  const [engine, setAppEngine] = useState([]);
  const [evals, setEvals] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(100);

  const dispatch = useDispatch();

  useEffect(() => {
    const stockfishWorker = new Worker('/stockfish.js', { type: 'module' });

    stockfishWorker.onmessage = (event) => {
      // console.log(event.data);
    };

    stockfishWorker.postMessage('uci');
    stockfishWorker.onmessage = (event) => {
      if (event.data.includes('uciok')) {
        // Once the engine is ready, send the position
        stockfishWorker.postMessage('position startpos');
        stockfishWorker.postMessage('setoption Threads value 8');
        stockfishWorker.postMessage('setoption Hash value 32');
      }
      // Print the response from Stockfish
      // console.log(event.data);
    }

    stockfishWorker.onerror = (error) => {
      console.error(error);
    };

    const enginecontroller = new EngineController(stockfishWorker);
    setAppEngine(enginecontroller)
    dispatch(setEngine(enginecontroller));

    return () => {
      stockfishWorker.postMessage('quit');
      stockfishWorker.terminate();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function evaluateMoves() { 
      if (moves && engine) {
        const analgame = new Chess();
        const evals = [];
        for (let i = 0; i < moves.length; i++) {
          evals.push(await engine.evaluatePosition(20));
          if (cancelled) {
            return;
          }
          setLoadingPercentage(Math.ceil((i / (moves.length - 1)) * 100));
          if (moves[i]) {
            analgame.move(moves[i])
            await engine.sendPosition(analgame.fen());
          }
        }
        setEvals(evals)
      }
    }
    evaluateMoves().catch(error => {
      console.error(error);
    });

    return () => {
      cancelled = true;
    };
  }, [engine, moves]);

  useEffect(() => {
    setMoves(zip(whiteMoves, blackMoves).flat(1))
  }, [whiteMoves, blackMoves])

  const setLoadingIndicator = (percent) => {
    const show = percent !== 100 
    return <AnalysisProgressModal modal={show} percentage={percent} />
  }

  return (  
      <div className="App container-fluid row">
        <div className='col-2'></div>
        <div className="mainContainer col-5">
          <UserIcon username={white} rating={whiteElo} imageURL={whiteImageUrl} color='B' height="40px" width="40px"/>
          <div className="boardContainer" style={{minHeight: '765px'}}>
            <div className='evalBar'><EvaluationBar evaluation={-3.6}/></div>
            <Board />
          </div>
          <UserIcon username={black} rating={blackElo} imageURL={blackImageUrl} color='W' height="40px" width="40px"/>
        </div>
        <AnalysisBar opening={opening} /> 
        {setLoadingIndicator(loadingPercentage)}
      </div>
  );
}

export default App;
