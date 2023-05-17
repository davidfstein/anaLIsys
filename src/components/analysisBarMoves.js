import { useSelector } from 'react-redux';
import { zip } from '../utils/utils';
import AnalysisBarMove from './analysisBarMove';

const AnalysisBarMoves = (props) => {

    const whiteMoves = useSelector((state) => state.game.whiteMoves);
    const blackMoves = useSelector((state) => state.game.blackMoves);
    const moves = zip(whiteMoves, blackMoves)

    let ply = 0;
    const moveRows = [];
    moves.forEach((movePair, index) => {
        moveRows.push(<AnalysisBarMove movePair={movePair} plies={[ply, ply+1]} index={index}/>);
        ply = ply + 2;
    })

    return <div className="analysisBarMoves">
        <table>
            <tbody> 
                {moveRows}
            </tbody>
        </table>
    </div>

}

export default AnalysisBarMoves;