import { configureStore } from '@reduxjs/toolkit'
import historySearchReducer from '../features/historySearchSlice'
export const store = configureStore({
    reducer: {
        historySearch: historySearchReducer
    },
})
