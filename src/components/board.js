import { Chessboard } from "react-chessboard";
import { useSelector } from 'react-redux';
import '../styles/board.css';


const Board = () => {

    const currentPosition = useSelector((state) => state.game.currentPosition);

    return (<div style={{width : '40vw', height: '40vh', margin: "0 auto"}}>
            <Chessboard id="board" position={currentPosition} customBoardStyle={{borderRadius: '5px', paddingTop: '10px', width : '40vw', height: '40vh'}}/> 
    </div>);
}

export default Board;
