import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import roomSlice from "./slices/room-slice"

const persistConfig = {
  key: "cotopia-lite",
  storage: storage,
  whitelist: ["room-slice"],
}

const rootReducer = combineReducers({
  roomSlice,
})

const _persistedReducer = persistReducer(persistConfig, rootReducer)

export const reduxStore = configureStore({
  reducer: _persistedReducer,
})

export const persistor = persistStore(reduxStore)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
