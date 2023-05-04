import Board from './components/board';
import AnalysisBar from './components/analysisbar';
import UserIcon from './components/usericon';
import EvaluationBar from './components/evaluationBar';
import { setEngine } from './reducers/gameSlice';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react';
import EngineController from './controllers/engineController';

function App() {
  const white = useSelector((state) => state.game.whitePlayer)
  const black = useSelector((state) => state.game.blackPlayer)
  const whiteElo = useSelector((state) => state.game.whiteRating)
  const blackElo = useSelector((state) => state.game.blackRating)
  const whiteImageUrl = useSelector((state) => state.game.whiteImage)
  const blackImageUrl = useSelector((state) => state.game.blackImage)
  const opening = useSelector((state) => state.game.opening)

  const dispatch = useDispatch();

  useEffect(() => {
    const stockfishWorker = new Worker('/stockfish.js', { type: 'module' });

    stockfishWorker.onmessage = (event) => {
      console.log(event.data);
    };

    stockfishWorker.postMessage('uci');
    stockfishWorker.onmessage = function (event) {
      if (event.data.includes('uciok')) {
        // Once the engine is ready, send the position and null move commands
        stockfishWorker.postMessage('position startpos');
      }
      
      // Print the response from Stockfish
      console.log(event.data);
    }

    stockfishWorker.onerror = function(error) {
      console.error(error);
    };

    dispatch(setEngine(new EngineController(stockfishWorker)));
  }, []);

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
      </div>
  );
}

export default App;
