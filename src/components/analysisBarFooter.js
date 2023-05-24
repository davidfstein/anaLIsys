import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { zip } from '../utils/utils';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentMove, goForward, undoMove, loadBeginning } from '../reducers/gameSlice';

const AnalysisBarFooter = () => {

    const game = useSelector((state) => state.game.game);
    const currentMove = useSelector((state) => state.game.currentMove);
    const whiteMoves = useSelector((state) => state.game.whiteMoves);
    const blackMoves = useSelector((state) => state.game.blackMoves);
    const moves = zip(whiteMoves, blackMoves).flat(1); 

    const dispatch = useDispatch()

    const forward = (moveIndex) => {
        if (moveIndex === moves.length - 1) {
            return true;
        }
        dispatch(goForward(moves[moveIndex]))
        return false;
    }

    const sendGameState = (moveIndex) => {
        dispatch(setCurrentMove(moveIndex));
    }

    const handleClick = (type) => {  
        let isEnd = currentMove === moves.length - 1; 
        switch (type) {
            case 'forward':
                isEnd = forward(currentMove);
                if (isEnd) {
                    break;
                }
                sendGameState(currentMove + 1);
                break;
            case 'end':
                for (let x = currentMove; x < moves.length; x++) {
                    isEnd = forward(x);
                    if (isEnd) {
                        break;
                    }
                }
                sendGameState(moves.length - 1);
                break;
            case 'back':
                if (currentMove === 0) {
                    break;
                }
                dispatch(undoMove());
                sendGameState(currentMove - 1);
                break;
            case 'beginning':
                if (currentMove === 0) {
                    break;
                }
                dispatch(loadBeginning());
                sendGameState(0);
                break;
            default:
                console.log(type)
        }
    }

    const toBeginningButton = <div onClick={() => handleClick('beginning')}><FontAwesomeIcon icon={faChevronLeft}/><FontAwesomeIcon icon={faChevronLeft} /></div> 
    const oneBack = <div onClick={() => handleClick('back')} style={{marginLeft: "10px", marginRight: "5px"}}><FontAwesomeIcon icon={faChevronLeft}/></div>
    const toEndButton = <div onClick={() => handleClick('end')}><FontAwesomeIcon icon={faChevronRight}/><FontAwesomeIcon icon={faChevronRight} /></div> 
    const oneForward = <div onClick={() => handleClick('forward')} style={{marginRight: "10px", marginLeft: "5px"}}><FontAwesomeIcon icon={faChevronRight}/></div>

    return <div className='analysisBarFooter'>
        {toBeginningButton}{oneBack}{oneForward}{toEndButton}
    </div>

}

export default AnalysisBarFooter;