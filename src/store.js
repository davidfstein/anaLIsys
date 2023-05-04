import { configureStore } from '@reduxjs/toolkit'

import gameReducer from './reducers/gameSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
  }
})

export default store;