import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const historySearchSlice = createSlice({
    name: 'historySearch',
    initialState,
    reducers: {
        addHistory: (state, action) => {
            const exists = state.value.some(item => item.query === action.payload.query)
            if (!exists) {
                state.value.push(action.payload)
            }
        },
        clearHistory: (state) => {
            state.value = []
        },
    },
})

export const { addHistory, clearHistory } = historySearchSlice.actions

export default historySearchSlice.reducer