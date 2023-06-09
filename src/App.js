import Board from './components/board';
import { Chess } from 'chess.js';
import AnalysisBar from './components/analysisbar';
import UserIcon from './components/usericon';
import EvaluationBar from './components/evaluationBar';
import EngineController from './controllers/engineController';
import AnalysisProgressModal from './components/analysisProgressModal';
import { zip } from './utils/utils';
import { Evaluation } from './utils/Evaluation';
import { GameReview } from './utils/GameReview';
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
  const [moves, setMoves] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(100);

  const dispatch = useDispatch();

  useEffect(() => {
    setMoves(zip(whiteMoves, blackMoves).flat(1))
  }, [whiteMoves, blackMoves])

  useEffect(() => {

    async function evaluateMoves() { 
      const engine = await EngineController.build();
      let evals = [];
      if (moves.length !== 0 && engine) {
        setLoadingPercentage(0);
        
        let fens = [];
        const analgame = new Chess();
        for (let i = 0; i < moves.length; i++) {
          if (moves[i]) {
            analgame.move(moves[i])
            fens.push(analgame.fen())
          }
        }
        fens = fens.reverse()
  
        for (let i = 0; i < fens.length; i++) {
          await engine.sendPosition(fens[i]);
          const start = Date.now();
          let positionEval = await engine.evaluatePosition(20);
          // let positionEval = {'type': 'cp', 'value': Math.round(Math.random() * 100)}
          // positionEval.value = i % 2 === 0 ? positionEval.value : -positionEval.value;
          const end = Date.now();
          console.log(`Execution time: ${(end - start) / 1000} s`);
          evals.push(positionEval);
          setLoadingPercentage(Math.ceil((i / (fens.length - 1)) * 100));
        }

        evals = evals.reverse();
        const evaluation = new Evaluation(evals);
        const [whiteCPLs, blackCPLs] = evaluation.getCPLs();
        
        console.log('White CPLs:', whiteCPLs)
        console.log('Black CPLs:', blackCPLs)
        console.log('Mean white CPL:', whiteCPLs.reduce((p,a) => p + a, 0) / whiteCPLs.length)
        console.log('Mean black CPL:', blackCPLs.reduce((p,a) => p + a, 0) / blackCPLs.length)
        console.log('Accuracy:', evaluation.getGameAccuracy())
        console.log('Evals:', evals);

        const bestMoves = new Array(moves.length).fill(0);
        const whiteReview = new GameReview(whiteCPLs, 
                                           moves.filter((move, i) => (i % 2 === 0)), 
                                           bestMoves.filter((move, i) => (i % 2 === 0))); 
        const whiteInaccuracies = whiteReview.innaccuracyCount();
        const whiteMistakes = whiteReview.mistakeCount();
        const whiteBlunders = whiteReview.blunderCount();
        const whiteGoods = whiteReview.goodCount();
        const whiteExcellents = whiteReview.excellentCount();
        const whiteBests = whiteReview.bestCount();

        const blackReview = new GameReview(blackCPLs, 
                                           moves.filter((move, i) => (i % 2 !== 0)), 
                                           bestMoves.filter((move, i) => (i % 2 !== 0))) 
        const blackInaccuracies = blackReview.innaccuracyCount();
        const blackMistakes = blackReview.mistakeCount();
        const blackBlunders = blackReview.blunderCount();
        const blackGoods = blackReview.goodCount();
        const blackExcellents = blackReview.excellentCount();
        const blackBests = blackReview.bestCount();

        console.log('White Inaccuracies:', whiteInaccuracies);
        console.log('White Mistakes:', whiteMistakes);
        console.log('White Blunders:', whiteBlunders);
        console.log('White Goods:', whiteGoods);
        console.log('White Excellents:', whiteExcellents);
        console.log('White Bests:', whiteBests);
        console.log('black Inaccuracies:', blackInaccuracies);
        console.log('black Mistakes:', blackMistakes);
        console.log('black Blunders:', blackBlunders);
        console.log('black Goods:', blackGoods);
        console.log('black Excellents:', blackExcellents);
        console.log('black Bests:', blackBests);
        
        dispatch(setEvalsState(evals))
      }  
      engine.cleanup()
    }
    
    evaluateMoves();
  }, [moves, dispatch]);

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
