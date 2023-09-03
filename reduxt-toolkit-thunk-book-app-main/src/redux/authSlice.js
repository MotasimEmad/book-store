import { createSlice } from "@reduxjs/toolkit";

/**
 * This is the Redux slice for managing authentication state.
 */

const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false , name: "Motasim Emad"},
    reducers: {
        /**
         * Toggles the user's login/logout status.
         * @param {object} state - The current authentication state.
         */
        
        logInOut: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        }
    }
});


export const { logInOut } = authSlice.actions;
export default authSlice.reducer;