import { useSelector } from 'react-redux';
import { zip } from '../utils/utils';

const AnalysisBarMoves = (props) => {

    const whiteMoves = useSelector((state) => state.game.whiteMoves);
    const blackMoves = useSelector((state) => state.game.blackMoves);
    const moves = zip(whiteMoves, blackMoves)

    const selectMove = (event) => {
        const tds = Array.from(document.querySelector(".analysisBarMoves").getElementsByTagName("td"));
        tds.forEach(td => td.classList.remove('selected'))
        event.target.classList.add('selected');
    }

    const generateMoveRows = (moves) => moves.map((movePair, index) => <tr key={index}><td>{index + 1}.</td><td onClick={selectMove}>{movePair[0]}</td><td onClick={selectMove}>{movePair[1]}</td></tr>);

    return <div className="analysisBarMoves">
        <table>
            <tbody> 
                {generateMoveRows(moves)}
            </tbody>
        </table>
    </div>

}

export default AnalysisBarMoves;