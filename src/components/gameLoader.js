import '../styles/gameLoader.css';
import { parse } from '@mliebelt/pgn-parser';
import { useDispatch } from 'react-redux';
import { setWhitePlayer, setBlackPlayer, 
         setWhiteElo, setBlackElo, 
         setBlackImage, setWhiteImage, 
         setOpening, addMove,
         resetState, setEndPosition } from '../reducers/gameSlice';
import { useNavigate } from "react-router-dom";

const GameLoader = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
        const pgn = document.querySelector('.pgnInput').value;
        const game = parse(pgn, {startRule: "game"});
        dispatch(resetState());
        dispatch(setWhitePlayer(game.tags.White));
        dispatch(setBlackPlayer(game.tags.Black));
        dispatch(setWhiteElo(game.tags.WhiteElo));
        dispatch(setBlackElo(game.tags.BlackElo));
        dispatch(setBlackImage(game.tags.BlackUrl));
        dispatch(setWhiteImage(game.tags.WhiteUrl));
        dispatch(setOpening(game.tags.ECO));
        dispatch(setEndPosition(game.tags.CurrentPosition));
        game.moves.forEach(move => dispatch(addMove({payload: move.notation.notation, player: move.turn})));
        console.log(game)
        navigate('/review')
    }

    return <div className='loaderContainer'>
        <textarea className='pgnInput'></textarea>
        <button className='loadButton' onClick={handleClick}>Load</button>
    </div>
}

export default GameLoader;