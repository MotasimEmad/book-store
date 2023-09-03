import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./bookSlice";
import authSlice from "./authSlice";

export const store = configureStore({
    reducer: {
        book: booksSlice,
        auth: authSlice,
    }
});