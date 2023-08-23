import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: {},
        auth: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.auth = true
        },
        setDefault: (state, action) => {
            state.user = {}
            state.auth = false
            localStorage.clear()
        }
    }
})

export const { setUser, setDefault } = userSlice.actions
export default userSlice.reducer