import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem("userInfo")) || {} ,
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
    },
})

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions

export default userSlice.reducer
