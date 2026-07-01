import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.value.push(action.payload)

    },
  },
})

export const { saveUser } = userSlice.actions

export default userSlice.reducer