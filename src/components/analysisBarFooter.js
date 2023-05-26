import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { zip } from '../utils/utils';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentMove } from '../reducers/gameSlice';

const AnalysisBarFooter = () => {

    const game = useSelector((state) => state.game.game);
    const currentMove = useSelector((state) => state.game.currentMove);
    const whiteMoves = useSelector((state) => state.game.whiteMoves);
    const blackMoves = useSelector((state) => state.game.blackMoves);
    const moves = zip(whiteMoves, blackMoves).flat(1); 

    const dispatch = useDispatch()

    const sendGameState = (moveIndex) => {
        dispatch(setCurrentMove(moveIndex));
    }

    const handleClick = (type) => {  
        let isEnd = currentMove === moves.length - 1; 
        switch (type) {
            case 'forward':
                if (isEnd) {
                    break;
                }
                sendGameState(currentMove + 1);
                break;
            case 'end':
                for (let x = currentMove; x < moves.length; x++) {
                    if (x === moves.length - 1) {
                        break;
                    }
                }
                sendGameState(moves.length - 1);
                break;
            case 'back':
                if (currentMove === -1) {
                    break;
                }
                sendGameState(currentMove - 1);
                break;
            case 'beginning':
                if (currentMove === -1) {
                    break;
                }
                sendGameState(-1);
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