import { useSelector } from 'react-redux';

const AnalysisBarMove = (props) => {

    const currentMove = useSelector((state) => state.game.currentMove);
    const white = currentMove % 2 === 0;

    return  <tr key={props.index}>
                <td>{props.index + 1}.</td>
                <td className={currentMove === props.plies[0] && white  ? 'selected' : ''}>{props.movePair[0]}</td>
                <td className={currentMove === props.plies[1] && !white ? 'selected' : ''}>{props.movePair[1]}</td>
            </tr>

}

export default AnalysisBarMove;