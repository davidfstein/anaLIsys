import Board from './components/board';
import AnalysisBar from './components/analysisbar';
import UserIcon from './components/usericon';
import EvaluationBar from './components/evaluationBar';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const white = useSelector((state) => state.game.whitePlayer)
  const black = useSelector((state) => state.game.blackPlayer)
  const whiteElo = useSelector((state) => state.game.whiteRating)
  const blackElo = useSelector((state) => state.game.blackRating)
  const whiteImageUrl = useSelector((state) => state.game.whiteImage)
  const blackImageUrl = useSelector((state) => state.game.blackImage)
  const opening = useSelector((state) => state.game.opening)

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
