

import { configureStore, Store } from '@reduxjs/toolkit'
import weather_forecast_slice from '../reducer-slices/weather.forecast.slice';

export const appStore: Store = configureStore({
    reducer: {
        weather_forecast_slice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch