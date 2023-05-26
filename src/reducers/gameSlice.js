import { createSlice } from '@reduxjs/toolkit';
import { Chess } from 'chess.js';
import { INITIAL_FEN } from '../Constants';
import { zip } from '../utils/utils';

const initialState = {
  whiteMoves: [],
  blackMoves: [],
  moves: [],
  whitePlayer: '',
  blackPlayer: '',
  whiteRating: '',
  blackRating: '',
  blackImage: '',
  whiteImage: '',
  opening: '',
  currentMove: -1,
  currentPosition: INITIAL_FEN,
  endPosition: '',
  evals: [],
  game: new Chess(), 
}

const SET_MOVES = (state, action) => {
  state.moves = action.payload;
}

const ADD_MOVE = (state, action) => {
  if (action.payload.player === 'w') state.whiteMoves.push(action.payload.payload);
  else state.blackMoves.push(action.payload.payload);
  SET_MOVES(state, {'payload': zip(state.whiteMoves, state.blackMoves).flat(1)})
}

const GO_FORWARD = (state, action) => {
  state.game.move(action.payload)
  state.currentPosition = state.game.fen()
}

const UNDO_MOVE = (state, action) => {
  state.game.undo()
  state.currentPosition = state.game.fen()
}

const LOAD_BEGINNING = (state, action) => {
  state.game.load(INITIAL_FEN)
  state.currentPosition = state.game.fen()
}

const SET_CURRENT_MOVE = (state, action) => {
  const currentMove = state.currentMove;
  if (action.payload === -1) {
    LOAD_BEGINNING(state, action);
  } else if (action.payload < currentMove) {
    for (let i = currentMove; i > action.payload; i--) {
      UNDO_MOVE(state, action)
    } 
  } else if (action.payload > currentMove) {
    for (let i = currentMove; i < action.payload; i++) {
      GO_FORWARD(state, {'payload': state.moves[i + 1]})
    } 
  }
  state.currentMove = action.payload
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addMove(state, action) {
      ADD_MOVE(state, action)
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
      SET_CURRENT_MOVE(state, action)
    },
    setEndPosition(state, action) {
      state.endPosition = action.payload
    },
    setGame(state, action) {
      state.game = action.payload
    },
    goForward(state, action) {
      GO_FORWARD(state, action)
    },
    undoMove(state, action) {
      UNDO_MOVE(state, action)
    },
    loadBeginning(state, action) {
      LOAD_BEGINNING(state, action)
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
               setBlackImage, setWhiteImage, setOpening, setCurrentMove,
               setEndPosition, setGame, resetState, goForward, undoMove, loadBeginning,
               setEngine, setEvalsState } = gameSlice.actions;

export default gameSlice.reducer;