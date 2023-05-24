import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentMove } from '../reducers/gameSlice';

const AnalysisBarMove = (props) => {

    const currentMove = useSelector((state) => state.game.currentMove);
    const white = currentMove % 2 === 0;
    const dispatch = useDispatch()

    const sendCurrentMove = (moveIndex) => {
        dispatch(setCurrentMove(moveIndex));
    }

    return  <tr key={props.index}>
                <td>{props.index + 1}.</td>
                <td onClick={() => sendCurrentMove(props.plies[0])} className={currentMove === props.plies[0] && white  ? 'selected' : ''}>{props.movePair[0]}</td>
                <td onClick={() => sendCurrentMove(props.plies[1])} className={currentMove === props.plies[1] && !white ? 'selected' : ''}>{props.movePair[1]}</td>
            </tr>

}

export default AnalysisBarMove;