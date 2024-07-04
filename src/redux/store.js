import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { spotify23 } from './services/shazamCore';
import playerReducer from './features/playerSlice';

export const store = configureStore({
  reducer: {
    [spotify23.reducerPath]: spotify23.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotify23.middleware)
});
  