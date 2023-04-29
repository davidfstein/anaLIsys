import { createSlice } from '@reduxjs/toolkit';
import { Chess } from 'chess.js';
import { INITIAL_FEN } from '../Constants';


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
  game: new Chess()
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
      // state.currentPosition = state.game.fen()
    },
    undoMove(state, action) {
      state.game.undo()
    },
    loadBeginning(state, action) {
      state.game.load(INITIAL_FEN)
    },
    resetState(state, action) {
      state = initialState
    }
  }
})

export const { addMove, clearMoves, setWhitePlayer, setBlackPlayer, setWhiteElo, setBlackElo, 
               setBlackImage, setWhiteImage, setOpening, setCurrentMove, setCurrentPosition,
               setEndPosition, setGame, resetState, goForward, undoMove, loadBeginning } = gameSlice.actions;

export default gameSlice.reducer;