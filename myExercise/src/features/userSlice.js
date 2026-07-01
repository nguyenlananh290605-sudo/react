import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      const exists = state.value.some(item => item.id === action.payload.id)
      if (!exists) {
        state.value.push(action.payload)
      }
      console.log('USER action.payload', action.payload)

    },
  },
})

export const { saveUser } = userSlice.actions

export default userSlice.reducer