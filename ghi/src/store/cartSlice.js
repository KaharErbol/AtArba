import { createSlice } from "@reduxjs/toolkit";
import Cart from "../components/Cart";

const initialState = [];

const carSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload)
        },

        remove(state, action) {
            return state.filter(item => item.id !== action.payload)
        }
    }
});

export const{ add,remove } = carSlice.actions;
export default carSlice.reducer;