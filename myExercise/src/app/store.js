import { configureStore } from '@reduxjs/toolkit'
import historySearchReducer from '../features/historySearchSlice'
import userReducer from '../features/userSlice'
export const store = configureStore({
    reducer: {
        historySearch: historySearchReducer,
        user: userReducer,
    },
})
