import Board from './components/board';
import { Chess } from 'chess.js';
import AnalysisBar from './components/analysisbar';
import UserIcon from './components/usericon';
import EvaluationBar from './components/evaluationBar';
import EngineController from './controllers/engineController';
import AnalysisProgressModal from './components/analysisProgressModal';
import { zip } from './utils/utils';
import { setEvalsState} from './reducers/gameSlice';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react';
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
  const evals = [];
  const [moves, setMoves] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(100);

  const dispatch = useDispatch();

  useEffect(() => {
    setMoves(zip(whiteMoves, blackMoves).flat(1))
  }, [whiteMoves, blackMoves])

  useEffect(() => {

    async function evaluateMoves() { 
      const engine = await EngineController.build(); 
      if (moves && engine) {
        const analgame = new Chess();
        for (let i = 0; i < moves.length; i++) {
          const start = Date.now();
          console.log('evaluating')
          let positionEval = await engine.evaluatePosition(20);
          // let positionEval = {'type': 'cp', 'value': Math.round(Math.random() * 100)}
          // positionEval.value = i % 2 === 0 ? positionEval.value : -positionEval.value;
          const end = Date.now();
          console.log(`Execution time: ${(end - start) / 1000} s`);
          evals.push(positionEval);
          setLoadingPercentage(Math.ceil((i / (moves.length - 1)) * 100));
          if (moves[i]) {
            analgame.move(moves[i])
            await engine.sendPosition(analgame.fen());
          }
        }
        dispatch(setEvalsState(evals))
      }
      engine.cleanup()
    }
    
    evaluateMoves().catch(error => {
      console.error(error);
    });
  }, [moves]);

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
            <div className='evalBar'><EvaluationBar/></div>
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
