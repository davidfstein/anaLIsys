import { createSlice } from '@reduxjs/toolkit';
import { Chess } from 'chess.js';
import { INITIAL_FEN } from '../Constants';
import EngineController from '../controllers/engineController';

const initialState = {
  whiteMoves: [],
  blackMoves: [],
  whitePlayer: '',
  blackPlayer: '',
  whiteRating: '',
  blackRating: '',
  blackImage: '',
  whiteImage: '',
  opening: '',
  currentMove: 0,
  currentPosition: INITIAL_FEN,
  endPosition: '',
  evals: [],
  game: new Chess(), 
  engine: new EngineController()
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addMove(state, action) {
      if (action.payload.player === 'w') state.whiteMoves.push(action.payload.payload);
      else state.blackMoves.push(action.payload.payload);
    },
    clearMoves(state, action) {
      state.whiteMoves = [];
      state.blackMoves = [];
    },
    setWhitePlayer(state, action) {
      state.whitePlayer = action.payload
    },
    setBlackPlayer(state, action) {
      state.blackPlayer = action.payload
    },
    setWhiteElo(state, action) {
      state.whiteRating = action.payload
    },
    setBlackElo(state, action) {
      state.blackRating = action.payload
    },
    setBlackImage(state, action) {
      state.blackImage = action.payload
    },
    setWhiteImage(state, action) {
      state.whiteImage = action.payload
    },
    setOpening(state, action) {
      state.opening = action.payload
    },
    setCurrentMove(state, action) {
      state.currentMove = action.payload
    },
    setCurrentPosition(state, action) {
      state.currentPosition = action.payload
    },
    setEndPosition(state, action) {
      state.endPosition = action.payload
    },
    setGame(state, action) {
      state.game = action.payload
    },
    goForward(state, action) {
      state.game.move(action.payload)
    },
    undoMove(state, action) {
      state.game.undo()
    },
    loadBeginning(state, action) {
      state.game.load(INITIAL_FEN)
    },
    setEngine(state, action) {
      state.engine = action.payload
    },
    setEvalsState(state, action) {
      console.log(action.payload)
      state.evals = action.payload
    },
    resetState(state, action) {
      state = initialState
    }
  }
})

export const { addMove, clearMoves, setWhitePlayer, setBlackPlayer, setWhiteElo, setBlackElo, 
               setBlackImage, setWhiteImage, setOpening, setCurrentMove, setCurrentPosition,
               setEndPosition, setGame, resetState, goForward, undoMove, loadBeginning,
               setEngine, setEvalsState } = gameSlice.actions;

export default gameSlice.reducer;