/**
 * @module bookSlice
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get_books } from "../api";

/**
 * Asynchronous thunk to fetch a list of books from the API.
 *
 * @function
 * @async
 * @param {object} _ - Not used in this thunk.
 * @param {object} thunkAPI - The Redux Toolkit `thunkAPI`.
 * @throws {string} If an error occurs during the API call.
 * @returns {Promise} A promise that resolves to the fetched data.
 */

export const getBooks = createAsyncThunk('book/getBooks', async(_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await fetch(get_books);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

/**
 * Asynchronous thunk to insert a new book into the API.
 *
 * @function
 * @async
 * @param {object} bookData - The data of the book to insert.
 * @param {object} thunkAPI - The Redux Toolkit `thunkAPI`.
 * @throws {string} If an error occurs during the API call.
 * @returns {Promise} A promise that resolves to the inserted book data.
 */

export const insertBooks = createAsyncThunk('book/insertBooks', async(bookData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
        bookData.userName = getState().auth.name;
        const response = await fetch(get_books, {
            method: 'POST',
            body: JSON.stringify(bookData),
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

/**
 * Asynchronous thunk to retrieve a single book from the API.
 *
 * @function
 * @async
 * @param {object} book - The book object to retrieve.
 * @param {object} thunkAPI - The Redux Toolkit `thunkAPI`.
 * @throws {string} If an error occurs during the API call.
 * @returns {Promise} A promise that resolves to the retrieved book data.
 */

export const getBook = createAsyncThunk('book/getBook', async(book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(get_books+`/${book.id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
            }
        });

        return book;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

/**
 * Asynchronous thunk to delete a book from the API.
 *
 * @function
 * @async
 * @param {object} book - The book object to delete.
 * @param {object} thunkAPI - The Redux Toolkit `thunkAPI`.
 * @throws {string} If an error occurs during the API call.
 * @returns {Promise} A promise that resolves to the deleted book data.
 */

export const deleteBooks = createAsyncThunk('book/deleteBooks', async(book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(get_books+`/${book.id}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
            }
        });

        return book;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

/**
 * Redux slice for managing books.
 *
 * @constant
 * @type {object}
 */

const booksSlice = createSlice({
    name: "book",
    initialState: { books: [], isLoading: false, error: null, getBook: null },
    extraReducers: {
        [getBooks.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getBooks.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books = action.payload;
        },
        [getBooks.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [insertBooks.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertBooks.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books.push(action.payload);
        },
        [insertBooks.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [deleteBooks.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteBooks.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books = state.books.filter((element) => element.id !== action.payload.id);
        },
        [deleteBooks.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [getBook.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            // console.log(action.payload);
            state.getBook = action.payload;
        },
        [getBook.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export default booksSlice.reducer;